use strict;
use warnings;

use lib '../lib';

use Routes::API;
use Test::More tests => 2;
use Plack::Test;
use JSON;
use HTTP::Request::Common;
use Model::Problem; 

use Data::Dump qw/dd/;

## test that the /problems route exists
my $test_api = Plack::Test->create(Routes::API->to_app);
my $res  = $test_api->request( GET '/problemsets' );
ok( $res->is_success, '[GET /problemsets] successful' );


my $id = "576987cd541e655d9f6b9a01";

my $route = "/problemsets/$id"; 
$res = $test_api->request(GET $route);
ok($res->is_success, '[GET $route] successful'); 

my $params = decode_json $res->content; 
dd $params; 
my $set = Model::ProblemSet->new($params); 

dd $set; 

## create a new problem set 

#my $params = {name => "new_set", problems => []}; 
#$res = $test_api->request(POST '/problemsets','Content-Type' => 'application/json', Content => 
#  encode_json($params)); 
#ok($res->is_success, '[POST /problemsets] successful' ); 
#
#my $problem = decode_json $res->content; 
#my $id = $problem->{_id}; 

## check the put command

#$params->{name} = "updated name"; 

#
#$res = $test_api->request(PUT $route); 
#ok($res->is_success, "[PUT $route successful"); 
#
#dd $res; 


## delete the set

#$res = $test_api->request(HTTP::Request::Common::DELETE $route); 
#
#dd $res; 
#
#ok($res->is_success, "[DELETE $route successful"); 






## delete the set



