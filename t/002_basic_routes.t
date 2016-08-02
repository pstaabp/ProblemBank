use strict;
use warnings;

use lib '../lib';

use Routes::API;
use Routes::Templates;
use Test::More tests => 6;
use Plack::Test;
use JSON;
use HTTP::Request::Common;
use Model::Problem;

use Data::Dump qw/dd/;

my $app = Routes::Templates->to_app;
is( ref $app, 'CODE', 'Got app' );

my $test = Plack::Test->create($app);

my $res  = $test->request( GET '/' );
ok( $res->is_success, '[GET /] successful' );

$res = $test->request(GET '/problems');
ok($res->is_success, '[GET /problems] successful');

$res = $test->request(GET '/problemsets');
ok($res->is_success, '[GET /problemsets] successful');

$res = $test->request(GET '/problem');
ok($res->is_success, '[GET /problem] successful');

$res = $test->request(GET '/modules');
ok($res->is_success, '[GET /modules] successful');
