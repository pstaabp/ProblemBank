package Model::AuthorList;  # functions related to collections of problems
use base qw(Exporter);
use Model::AuthorList;
use MongoDB::OID; 
use Data::Dump qw/dd/;

my $COLLECTION_NAME = 'problemdb.authors';

our @EXPORT    = ();
our @EXPORT_OK = qw(author_collection get_author_by_id);

sub author_collection {  # return an array of Model::Module(s) 
  my ($client) = shift;  # need to pass a mongo collection
  my $mc = $client->ns($COLLECTION_NAME);
  my @authors = map {Model::Author->new($_);} $mc->find->all;
  return \@authors; 
}

sub get_author_by_id {
  my ($client,$id) = @_;
  my $mc = $client->ns($COLLECTION_NAME);
  my $author = Model::Author->new($mc->find_id(MongoDB::OID->new(value=>$id)));

  return $author; 
}

1; 