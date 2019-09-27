package Dancer2::Plugin::Auth::Extensible::Provider::LDAP;

use Moo;
with "Dancer2::Plugin::Auth::Extensible::Role::Provider";

# A more sensible provider would be likely to get this information from e.g. a
# database (or LDAP, or...) rather than hardcoding it.  This, however, is an
# example.
sub users {
    return {
        'dave' => {
            name     => 'David Precious',
            password => 'beer',
            roles    => [ qw(Motorcyclist BeerDrinker) ],
        },
        'bob' => {
            name     => 'Bob The Builder',
            password => 'canhefixit',
            roles    => [ qw(Fixer) ],
        },
    };
}

sub authenticate_user {
    my ($self, $username, $password) = @_;
    my $user_details = $self->get_user_details($username) or return;
    return $self->match_password($password, $user_details->{password});
}

sub get_user_details {
    my ($self, $username) = @_;

    return $self->users->{lc $username};
}

sub get_user_roles {
    my ($self, $username) = @_;

    my $user_details = $self->get_user_details($username) or return;
    return $user_details->{roles};
}



1;
