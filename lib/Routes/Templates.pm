## This contains all of the html templates for the app
package Routes::Templates;
use Dancer2;

use Dancer2::Plugin::Auth::Extensible;  ## this handles the users and roles.  See the configuration file for setup.

use Common::Collection qw/to_hashes get_all_in_collection/;
use Data::Dump qw/dump/;

get '/' => sub {
    template 'index';
};

get '/problems' => require_login sub {
    my $params = getAllData();
    $params->{appname} = "ListProblemsView";
    template 'problems', $params;
};

get '/problemsets' => require_login sub {
    my $params = getAllData();
    $params->{appname} = "ProblemSetsView";
    template 'problemsets', $params;
};

get '/problem' => require_login sub {
    my $params = getAllData();
    $params->{appname} = "AddProblemView";
    $params->{header} = "Add New Problem";
    template 'problem', $params;

};

get '/problems/:problem_id' => require_login sub {

    debug "in GET /problems/:problem_id";
    my $params = getAllData();
    $params->{appname} = "AddProblemView";
    $params->{header} = "Problem Editor";
    $params->{id} = route_parameters->{problem_id};
    template 'problem', $params;
};

get '/problemsets/:set_id' => require_login sub {
  my $params = getAllData();
  $params->{appname} = "ProblemSetView";
  $params->{header} = "Problem Set Editor";
  $params->{set_id} = route_parameters->{set_id};
  template 'problemset', $params;
};


get '/modules' => require_login sub {
    my $client = MongoDB->connect('mongodb://localhost');
    my $modules = to_hashes(get_all_in_collection($client,"problemdb.modules","Model::Module"));
    template 'modules', {appname => "EditModulesView",modules=> to_json($modules)};
};

sub getAllData {
    my $client = MongoDB->connect('mongodb://localhost');
    # print "in getAllData\n";
    my $authors = to_hashes(get_all_in_collection($client,"problemdb.authors","Model::Author"));
    my $modules = to_hashes(get_all_in_collection($client,"problemdb.modules","Model::Module"));
    my $problems = to_hashes(get_all_in_collection($client,"problemdb.problems","Model::Problem"));
    my $problem_sets = to_hashes(get_all_in_collection($client,"problemdb.problemsets","Model::ProblemSet"));

    return {  authors => to_json($authors),
              modules=> to_json($modules),
              problems => to_json($problems),
              problem_sets => to_json($problem_sets) };
}

true;
