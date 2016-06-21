package Common::Collection;

use base qw(Exporter);

#use Data::Dump qw/dd/;

our @EXPORT    = ();
our @EXPORT_OK = qw(to_hashes insert_to_db get_all_in_collection);

###
#  input: array reference of Model::Modules
#  ouput:  array reference of hash representations
# 
###

sub to_hashes { 
  my $modules = shift; 
  my @output = map { $_->to_hash} @{$modules};
  return \@output; 
}

##
#
#  A common inserting to the database. 
#
#  Note: needs some error checking.  

sub insert_to_db {
  my ($client,$collection_name,$obj) = @_; 
  my $collection = $client->ns($collection_name);
  my $result = $collection->insert_one($obj);
  $obj->{_id} = $result->{inserted_id}->{value}; 
  return $obj;
}

###
#
#  This returns a reference to an array of all items in a given collection
#
###

sub get_all_in_collection {
  my ($client,$collection_name,$class) = @_;  # need to pass a mongo collection
  my $mc = $client->ns($collection_name);
  my @items = map {$class->new($_);} $mc->find->all;
  return \@items;
}

1; 