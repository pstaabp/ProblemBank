package Model::Author;
use Moo;
use MooX::Types::MooseLike::Base qw(Str);
with 'Common::MongoDBable';

use Data::Dump qw/dd/;


has institution => (is=>'rw',isa => Str, default => "");
has last_name => (is=>'rw',isa => Str, default => "");
has first_name => (is=>'rw',isa => Str, default => "");
has email => (is=>'rw',isa => Str, default => "");

1;