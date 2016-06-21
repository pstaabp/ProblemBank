package Model::Module;
use Moo;
use MooX::Types::MooseLike::Base qw(Str);

has name => (is=>'rw',isa => Str, default => "");
with 'Common::MongoDBable';

sub insert_to_db {
  my ($self,$client) = @_;
  return $self->insert_to_db_common($client,'problemdb.modules'); 
}

use Data::Dump qw/dd/;


1;