package problemdb;
# handler: app.pl:
use Routes::Templates;
use Routes::API;
use Plack::Builder;
 
builder {
    mount '/'    => Routes::Templates->to_app;
    mount '/api' => Routes::API->to_app;
};

our $VERSION = '0.1';

true;
