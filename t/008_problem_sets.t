use strict;
use warnings;

use lib '../lib';

use MongoDB; 
use Model::ProblemSet;
use Data::Dump qw/dd dump/;


#my $client = MongoDB->connect('mongodb://localhost');
#my $mc = $client->ns('problemdb.problems');
#my $id = "575f0e5b541e651d7227cb01"; 
#my $p = $mc->find_id(MongoDB::OID->new(value=>$id));

my $set = Model::ProblemSet->new({ name => "howdy"}); 
#my $res = Model::ProblemList::remove_problem_by_id($client,$id); 

dump $set;
