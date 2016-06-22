package Common::MongoDBable;

use strictures 2;
use Moo::Role;
use Data::Dump qw/dd dump/;
use Data::Structure::Util qw( unbless );
use MooX::Types::MooseLike::Base qw(Str);

has _id => (is=>'ro');

around BUILDARGS => sub {
  my $orig = shift;
  my $class = shift;
  my %args = @_ == 1 ? %{ $_[0] } : @_;
  
  print ref($args{_id}) . "\n";
  if (ref($args{_id}) eq "MongoDB::OID") {
    $args{_id} = $args{_id}->{value}; 
  } 
  return $class->$orig( \%args );
};

sub insert_to_db_common {
  my ($self,$client,$collection_name) = @_;  # need to pass a mongo collection
  my $collection = $client->ns($collection_name);
  my $result = $collection->insert_one($self);
  $self->{_id} = $result->{inserted_id}->{value}; 
  return $self
}

sub remove_from_db_common {
  my ($self,$client,$collection_name) = @_;
  my $collection = $client->ns($collection_name);
  my $id_obj = MongoDB::OID->new(value =>$self->_id);
  $collection->delete_one({_id => $id_obj}); 
  return $self->to_hash; 

}

sub to_hash {
   my $self= shift; 
   my $hash = unbless($self);
   return $hash;
}

1;