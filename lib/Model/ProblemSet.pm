package Model::ProblemSet;
 
use Moo;
use Types::Standard qw( Str Int ArrayRef);
use DateTime;
#use MooX::Types::MooseLike::DateTime qw/DateAndTime/;
use File::Temp;
use File::Slurp qw/read_file/;
use Data::Dump qw/dump/; 
use Scalar::Util qw(looks_like_number);

with 'Common::MongoDBable';

has name => (is => 'ro', isa => Str);
has problems => (is => 'ro', isa => ArrayRef[Str], default => sub { return []; });

sub insert_to_db {
  my ($self,$client) = @_;
  return $self->insert_to_db_common($client,'problemdb.problemsets'); 
}

1;