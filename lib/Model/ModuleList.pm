package Model::ModuleList;  # functions related to collections of modules
use base qw(Exporter);

use Data::Dump qw/dd/;

our @EXPORT    = ();
our @EXPORT_OK = qw(module_collection);

sub module_collection {  # return an array of Model::Module(s) 
  my ($client) = shift;  # need to pass a mongo collection
  my $mc = $client->ns('problemdb.modules');
  my @modules = map {Model::Module->new($_);} $mc->find->all;
  return \@modules; 
}



1; 