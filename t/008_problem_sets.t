use strict;
use warnings;

use lib '../lib';

use Routes::API;
use Dancer2;
use Test::More tests => 2;
use Plack::Test;
#use JSON;
use HTTP::Request::Common;
use Model::Problem; 
use Types::Standard qw/ArrayRef Str Num/;


use Data::Dump qw/dd/;
## test that the /problems route exists
my $test_api = Plack::Test->create(Routes::API->to_app);

### get all of the problems

my $res = $test_api->request(GET '/problems');
ok($res->is_success, '[GET /problems] successful');

my $problems = from_json $res->content; 

## get all of the problem sets 

$res = $test_api->request(GET '/problemsets');
ok($res->is_success, '[GET /problemsets] successful');

my $sets = from_json $res->content;


## get the first set in the database

my $id = $sets->[0]->{_id};

my $route = "/problemsets/$id"; 
$res = $test_api->request(GET $route);
ok($res->is_success, "[GET $route] successful"); 

my $params = from_json $res->content; 
#dd $params; 
my $set = Model::ProblemSet->new($params); 

$set->latex;

#my @probs = @{$set->problems}; 
#push(@probs,$problems->[0]->{_id});
#push(@probs,$problems->[1]->{_id});
#
#$set->problems(\@probs); 
#
### put/update the problemset
#my $h = $set->to_hash;
#
#dd encode_json($h);
#
#$res = $test_api->request(PUT $route,'Content-Type' => 'application/json', 
#            Content => encode_json($h)); 
#
#
#dd $res->content;
#


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



