package Model::ProblemList;  # functions related to collections of problems
use base qw(Exporter);
use Model::Problem;
use MongoDB::OID; 
use DateTime;
use Data::Dump qw/dd dump/;

#use Dancer2; 

our @EXPORT    = ();
our @EXPORT_OK = qw(problem_collection get_problem_by_id update_problem_by_id);

sub problem_collection {  # return an array of Model::Module(s) 
  my ($client) = shift;  # need to pass a mongo collection
  my $mc = $client->ns('problemdb.problems');
  my @problems = map {Model::Problem->new($_);} $mc->find->all;
  return \@problems; 
}

sub get_problem_by_id {
  my ($client,$id) = @_;
  my $mc = $client->ns('problemdb.problems');
  dd "in get_problem_by_id"; 
  my $id2 = MongoDB::OID->new(value=>$id);
  my $p = $mc->find_one({_id => $id2});
  my $prob = Model::Problem->new($p);

  return $prob; 
}

sub insert_new_problem {
  my ($client,$params) = @_;
  my $problem = new Model::Problem($params);
#  if (defined $params->{text_md}) {
#    $problem->text_md_date(DateTime->now); 
#  }
  my $result = Common::Collection::insert_to_db($client,'problemdb.problems',$problem); 
  
  #print dump $result; 
  
  return $result; 
} 

sub update_problem_by_id {
  my ($client,$id,$params) = @_;
  my $collection = $client->ns('problemdb.problems');
  my $id2 = MongoDB::OID->new(value=>$id);
  
  my $old_prob = $collection->find_one({_id=>$id2}); 
  
  print dump $old_prob; 
  
  my $prob = Model::Problem->new($collection->find_id($id2));
  $prob->text_md($params->{text_md});
  #$prob->solution_md($params->{solution_md});
  $prob->text_latex($params->{text_latex});
  #$prob->solution_latex($params->{solution_latex});
  #$prob->description($params->{description});
  $prob->module_id($params->{module_id});
  $prob->author_id($params->{author_id});
  #$prob->text_md_date(DateTime->now); 
  my $prob_to_update = $prob->to_hash;
  delete $prob_to_update->{_id};
  
  #debug dump $prob_to_update; 
  
  $collection->find_one_and_update({_id=>$id2}, $prob_to_update);
  
  ###
  # need to build in some error handling. 
  ##
  
  return $prob; 
}

sub remove_problem_by_id {
  my ($client,$id) = @_;
  
  print "in remove_problem_by_id\n"; 
  my $collection = $client->ns('problemdb.problems');
  my $id2 = MongoDB::OID->new(value=>$id);
  my $prob = get_problem_by_id($client,$id); 
  my $res = $collection->delete_one( { _id => $id2 } );
  if($res->{deleted_count} == 1) {
    return $prob->to_hash; 
  }  else {
    return {errors => $res->{write_errors}}; 
  }

  
  debug $res;
  
  
}

1; 