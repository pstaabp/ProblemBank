use strict;
use warnings;

use lib '../lib';

use Routes::API;
use Routes::Templates;
use Test::More tests => 7;
use Plack::Test;
use JSON;
use HTTP::Request::Common qw/GET POST PUT DELETE/;
use Model::Problem;

use Data::Dump qw/dd/;


## test that the /problems route exists

my $test_api = Plack::Test->create(Routes::API->to_app);
my $res  = $test_api->request( GET '/problems' );

ok( $res->is_success, '[GET /api/problems] successful' );

my $problems = decode_json $res->content;

#dd $problems;
is(ref($problems),"ARRAY","[GET /api/problems] returns an array");

### test to see if it returns a problem
#$res = $test_api->request(GET '/problems/57605ae1541e657ea6104f61');



$res = $test_api->request(GET '/problems/' . $problems->[2]->{_id});
ok($res->is_success, '[GET /api/problems/'. $problems->[2]->{_id} .'] successful.');
#dd $modules;

## test the templating routes:

my $test_template = Plack::Test->create(Routes::Templates->to_app);

$res = $test_template->request(GET '/problems/' . $problems->[2]->{_id});

ok( $res->is_success, '[GET /problems/' . $problems->[2]->{_id} .'] successful' );

### test latexing

$res = $test_api->request(POST '/problems/'. $problems->[2]->{_id} . '/latex');
ok( $res->is_success, '[POST /api/problems/' . $problems->[2]->{_id} .'/latex] successful' );
#

#
####
##  Create a new problem
####
my $params = {text_md => "This is a new problem", solution_md => "This is the solution"}; #, type=> ["qu","wr"]};
$res = $test_api->request(POST '/problems','Content-Type' => 'application/json', Content => encode_json($params));

my $obj = from_json($res->content);

ok($res->is_success, '[POST /problems] successful.');

###
#   Delete the problem just created.
###

$res = $test_api->request(DELETE '/problems/' . $obj->{_id});
ok($res->is_success, '[DELETE /problems/'. $obj->{_id}. '] successful');



done_testing();
