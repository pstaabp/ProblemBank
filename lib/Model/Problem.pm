package Model::Problem;

use Moo;
use Types::Standard qw( Str Int ArrayRef );
use DateTime;
#use MooX::Types::MooseLike::DateTime qw/DateAndTime/;
use File::Temp;
use File::Slurp qw/read_file/;
use Data::Dump qw/dd/;
use Scalar::Util qw(looks_like_number);

with 'Common::MongoDBable';

has problem_source => (is => 'rw', isa =>Str, default => sub {return "";});
has solution_source => (is => 'rw', isa =>Str, default => sub {return "";});
#has type => (is =>'rw', isa =>ArrayRef[Str],  default => sub { return [];});
has module_id => (is => 'rw', isa=>Str, default => sub {return "";});
has author_id => (is => 'rw', isa=>Str, default => sub {return "";});
has language => (is => 'rw', isa=>Str, default => sub { "markdown";});

our @non_date_fields = qw/problem_source solution_source
                          module_id author_id language _id/;

#around BUILDARGS => sub {
#  my ($orig,$class, %args ) = @_;
#
#  print dump $orig;
#  print dump $class;
#   #  turn the text_md_date field from an epoch to a DateTime object
#
#	my $text_md_date = delete $args{text_md_date};
#    if (not defined($text_md_date)){
#      $text_md_date = DateTime->now;
#    } elsif (looks_like_number($text_md_date)){
#      $text_md_date = DateTime->from_epoch( epoch => $text_md_date );
#    }
#
#    $args{text_md_date} = $text_md_date;
#
#    print dump keys(\%args);
#
#  return \%args;
#};

sub md_to_latex {
  my $self = shift;
  my $temp_dir = '/tmp/problemdb';
  mkdir($temp_dir) unless (-d $temp_dir);
  my $fh_md = File::Temp->new(DIR=>$temp_dir,SUFFIX =>'.md',UNLINK => 0);
  my $fh_tex = File::Temp->new(DIR=>$temp_dir,SUFFIX =>'.tex',UNLINK => 0);

  print $fh_md $self->text_md;

  my $output = system("/usr/local/bin/pandoc",$fh_md->filename,
                  "-f","markdown+tex_math_double_backslash","-o",$fh_tex->filename);

  my $tex_source = read_file($fh_tex->filename);
  $self->text_latex($tex_source);

  close $fh_tex;
  close $fh_md;

}

sub get_solution {
  my $self = shift;
  my $temp_dir = '/tmp/problemdb';
  mkdir($temp_dir) unless (-d $temp_dir);
  my $fh_md = File::Temp->new(DIR=>$temp_dir,SUFFIX =>'.md',UNLINK => 0);
  my $fh_tex = File::Temp->new(DIR=>$temp_dir,SUFFIX =>'.tex',UNLINK => 0);

  print $fh_md $self->solution_md;

  my $output = system("/usr/local/bin/pandoc",$fh_md->filename,
                  "-f","markdown+tex_math_double_backslash","-o",$fh_tex->filename);

  my $tex_source = read_file($fh_tex->filename);

  print $tex_source;
  $self->solution_latex($tex_source);

  close $fh_tex;
  close $fh_md;

  return $self->solution_latex;
}

sub compile_question {
  my $self = shift;
  return $self->problem_source;
}

sub compile_markdown {
  my $self = shift;
  return $self->text_md;
}

sub get_latex {
  my $self = shift;
  $self->md_to_latex;

  return $self->text_latex;

}

sub compile_solution {


}

sub insert_to_db {
  my ($self,$client) = @_;
  return $self->insert_to_db_common($client,'problemdb.problems');
}

sub to_hash {
    my $self= shift;
    my $hash = {};
    for my $field (@non_date_fields) {
        $hash->{$field} = $self->{$field};
    }
    $hash->{_id} = $self->{_id}->TO_JSON;
    #$hash->{_id} = $self->{_id}

    #$hash->{text_md_date} = $self->text_md_date->epoch()
    #  if defined($self->text_md_date) && $self->text_md_date->isa("DateTime");
    #$hash->{text_latex_date} = $self->text_latex_date->epoch() if defined($self->text_latex_date);
    return $hash;
}

1;
