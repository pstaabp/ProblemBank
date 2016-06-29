package Model::ProblemSet;

use Moo;
use Types::Standard qw/Str Int ArrayRef Enum/;
use DateTime;
#use MooX::Types::MooseLike::DateTime qw/DateAndTime/;
use File::Temp;
use File::Slurp qw/read_file/;
use Data::Dump qw/dump/;
use Scalar::Util qw(looks_like_number);
use Common::Collection qw/get_one_by_id/;
use File::ReadBackwards;

with 'Common::MongoDBable';

has name => (is => 'rw', isa => Str);
has problems => (is => 'rw', isa => ArrayRef[Str], default => sub { return []; });
has type => (is => 'rw', isa => Enum[qw(quiz hw exam gw other)]);  ## maybe this isn't the way to go with this.
has institution => (is => 'rw', isa => Str);
has instructor => (is => 'rw', isa => Str);
has header => (is=>'rw', isa => Str);
has date => (is => 'rw', isa => Str);
has course_name => (is => 'rw', isa => Str);

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
  my ($self,$client,$app_config,$inc_soln) = @_;
  my $s = "";

  my $include_solution = defined($inc_soln) || "";

  print "include_solution: $include_solution \n";

  print "in Model::ProblemSet::latex \n";
  for my $probid (@{$self->problems}) {
    my $prob = get_one_by_id($client,"problemdb.problems","Model::Problem",$probid);
    $s .= "\\item " . $prob->get_latex;

    if($include_solution){
      $s .= "\\hrulefill \n\n";
      $s .= $prob->get_solution;
      $s .= "\n\n \\hrulefill";
    }
  }

  my $output_dir = $app_config->{appdir} . "/public/output";

  # some useful options (see below for full list)
  my $config = {
      INCLUDE_PATH => $app_config->{appdir} . '/views',  # or list ref
      OUTPUT_PATH  => $output_dir,
      INTERPOLATE  => 1,               # expand "$var" in plain text
      POST_CHOMP   => "",               # cleanup whitespace
     # PRE_PROCESS  => 'header',        # prefix each template
  };

  my $response = {};
  # create Template object
  my $template = Template->new($config);

  my $params = { CONTENT => $s,
                  INST => $self->institution,
                  HEADER => $self->header,
                  INSTRUCTOR => $self->instructor,
                  DATE => $self->date,
                  INSTITUTION => $self->institution,
                  NAME => $self->name,
                  COURSE_NAME => $self->course_name};

  my $input = "latex_template.tex";
  my $out = "test.tex";
  $template->process($input,$params,$out);

  my $result = system('/Library/TeX/texbin/pdflatex',"-output-directory=$output_dir",
        "-halt-on-error",'-interaction=batchmode',"$output_dir/test.tex",'1> /dev/null');

  print $result . "\n";
  if (-e "$output_dir/texput.log"){
    return { errors => 1, log => read_file("$output_dir/texput.log")};
  }



  # Object interface

  my $bw = File::ReadBackwards->new("$output_dir/test.log") or die "can't read 'log_file' $!" ;

  my $latex_log = read_file("$output_dir/test.log");

  my $last_line = $bw->readline;
  $bw->close;

  if ($last_line =~ /^!/){
    return {errors => 1, log => $latex_log};
  }

  return {errors => 0, pdf => "/output/test.pdf"};

}

1;
