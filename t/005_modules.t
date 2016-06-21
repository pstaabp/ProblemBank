use strict;
use warnings;

use lib '../lib';

use Routes::API;
use Test::More tests => 3;
use Plack::Test;
use JSON;
use HTTP::Request::Common;

use Data::Dump qw/dd/;

my $app = Routes::API->to_app;
is( ref $app, 'CODE', 'Got app' );

## test that the /modules route exists

my $test = Plack::Test->create($app);
my $res  = $test->request( GET '/modules' );

ok( $res->is_success, '[GET /modules] successful' );

my $modules = decode_json $res->content; 
is(ref($modules),"ARRAY","[GET /modules] returns an array"); 


## test that the /modules route returns an array of Model::Modules

