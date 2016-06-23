package Model::ProblemSet;
 
use Moo;
use Types::Standard qw( Str Int ArrayRef);
use DateTime;
#use MooX::Types::MooseLike::DateTime qw/DateAndTime/;
use File::Temp;
use File::Slurp qw/read_file/;
use Data::Dump qw/dump/; 
use Scalar::Util qw(looks_like_number);
use Common::Collection qw/get_one_by_id/;

with 'Common::MongoDBable';

has name => (is => 'rw', isa => Str);
has problems => (is => 'rw', isa => ArrayRef[Str], default => sub { return []; });

sub insert_to_db {
  my ($self,$client) = @_;
  return $self->insert_to_db_common($client,'problemdb.problemsets'); 
}

sub remove_from_db {
  my ($self,$client) = @_;
  print "in remove_from_db\n";
  return $self->remove_from_db_common($client,'problemdb.problemsets'); 

}

sub latex {
  my ($self,$client,$app_config) = shift; 
  my $s = ""; 
  
  print "in Model::ProblemSet::latex \n";
  
  for my $probid (@{$self->problems}) {
    my $prob = get_one_by_id($client,"problemdb.problems","Model::Problem",$probid); 
    $s .= "\\item " . $prob->get_latex; 
  }
  
  my $output_dir = $app_config->{appdir} . "/public/output"; 

  # some useful options (see below for full list)
  my $config = {
      INCLUDE_PATH => $app_config->{appdir} . '/views',  # or list ref
      OUTPUT_PATH  => $output_dir,
      INTERPOLATE  => 1,               # expand "$var" in plain text
      POST_CHOMP   => 1,               # cleanup whitespace
     # PRE_PROCESS  => 'header',        # prefix each template
      EVAL_PERL    => 1,               # evaluate Perl code blocks
  };
  
  # create Template object
  my $template = Template->new($config);

  my $input = "latex_template.tex";
  my $out = "test.tex"; 
  $template->process($input,{CONTENT=>$s},$out);
  
  my $latex_out = system('/Library/TeX/texbin/pdflatex',"-output-directory=$output_dir","$output_dir/test.tex");
  
  debug $!; 


}

1;