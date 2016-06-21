use strict;
use warnings;

use lib '../lib';

use Routes::API;
#use Routes::Template; 
use Test::More tests => 6;
use Plack::Test;
use JSON;
use HTTP::Request::Common;
use Model::Problem; 

use Data::Dump qw/dd/;

#my $app = Routes::Templates->to_app;
my $api_app = Routes::API->to_app; 

## test that the /problems route exists

#my $test = Plack::Test->create($app);
my $test_api = Plack::Test->create($api_app);
my $res  = $test_api->request( GET '/problems' );

ok( $res->is_success, '[GET /problems] successful' );

my $modules = decode_json $res->content; 
is(ref($modules),"ARRAY","[GET /problems] returns an array"); 

### test to see if it returns a problem
$res = $test_api->request(GET '/problems/57605ae1541e657ea6104f61');



#$res = $test_api->request(GET '/problems/' . $modules->[2]->{_id});

dd $modules;



#ok( $res->is_success, '[GET /problems/' . $modules->[2]->{_id} .'] successful' );
#
#$res = $test_api->request(GET '/problems/' . $modules->[2]->{_id});
#ok( $res->is_success, '[GET /api/problems/' . $modules->[2]->{_id} .'] successful' );
#
##dd decode_json $res->content;
#
#$res = $test_api->request(POST '/problems/'. $modules->[2]->{_id} . '/latex');
#ok( $res->is_success, '[POST /api/problems/' . $modules->[2]->{_id} .'/latex] successful' );
#
### test latexing
#
#$res = $test_api->request(POST '/problems/latex');
#
#
#
###dd decode_json $res->content; 
#
####
##  Create a new problem
#### 
#my $params = {text_md => "This is a new problem", solution_md => "This is the solution"}; 
#$res = $test_api->request(POST '/problems','Content-Type' => 'application/json', Content => 
#  encode_json($params)); 

#dd $res->content; 

done_testing();



