package Model::Problem;
 
use Moo;
use Types::Standard qw( Str Int HashRef );
use DateTime;
#use MooX::Types::MooseLike::DateTime qw/DateAndTime/;
use File::Temp;
use File::Slurp qw/read_file/;
use Data::Dump qw/dump/; 
use Scalar::Util qw(looks_like_number);

with 'Common::MongoDBable';

has text_md => (is => 'rw', isa =>Str); 
#has text_md_date => (is => 'rw', isa => DateAndTime); 
#has solution_md => (is => 'rw', isa =>Str); 
has text_latex => (is => 'rw', isa =>Str); 
#has text_latex_date => (is => 'rw', isa => DateAndTime); 
#has solution_latex => (is => 'rw', isa =>Str); 
#has description => (is => 'rw', isa=>Str); 
has type => (is =>'ro', isa =>HashRef[Str]);
has module_id => (is => 'rw', isa=>Str);
has author_id => (is => 'rw', isa=>Str);
has language => (is => 'rw', isa=>Str, default => sub { "markdown";}); 

our @non_date_fields = qw/text_md solution_md text_latex solution_latex description
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
  my $fh_md = File::Temp->new(DIR=>'/tmp/problemdb',SUFFIX =>'.md',UNLINK => 0);
  my $fh_tex = File::Temp->new(DIR=>'/tmp/problemdb',SUFFIX =>'.tex',UNLINK => 0);
  #my $fh_pdf = File::Temp->new(DIR=>'/tmp/problemdb',SUFFIX =>'.pdf',UNLINK => 0);
  
  my $fname_md = $fh_md->filename;
  my $fname_tex = $fh_tex->filename;
  #my $fname_pdf = $fh_pdf->filename; 
  my $source = $self->text_md; 
   
  print $fh_md $source;  
   
   #print $source; 
   
   my $output = system("/usr/local/bin/pandoc",$fname_md,"-f","markdown+tex_math_double_backslash","-o",$fname_tex);

   my $tex_source = read_file($fname_tex);  
   $self->text_latex($tex_source); 
 
   ##print dump $self; 
   
   close $fh_tex;

   close $fh_md;

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
    
    #$hash->{text_md_date} = $self->text_md_date->epoch() 
    #  if defined($self->text_md_date) && $self->text_md_date->isa("DateTime");
    #$hash->{text_latex_date} = $self->text_latex_date->epoch() if defined($self->text_latex_date); 
    return $hash; 
}



1;