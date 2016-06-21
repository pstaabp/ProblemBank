package Common::MongoDBable;

use strictures 2;
use Moo::Role;
use Data::Dump qw/dd/;
use Data::Structure::Util qw( unbless );
use MooX::Types::MooseLike::Base qw(Str);

has _id => (is=>'ro');

around BUILDARGS => sub {
  my $orig = shift;
  my $class = shift;
  my %args = @_ == 1 ? %{ $_[0] } : @_;
  
  $args{_id} = $args{_id}->{value}; 
  return $class->$orig( \%args );
};

sub insert_to_db_common {
  my ($self,$client,$collection_name) = @_;  # need to pass a mongo collection
  my $modules = $client->ns($collection_name);
  my $result = $modules->insert_one($self);
  $self->{_id} = $result->{inserted_id}->{value}; 
  return $self
}

sub to_hash {
   my $self= shift; 
   my $hash = unbless($self);
   return $hash;
}

1;