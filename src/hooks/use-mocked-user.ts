import { _mock } from 'src/_mock';

// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Suraj Jamdadee',
    email: 'admin@gmail.com',
    password: 'admin1234',
    photoURL: _mock.image.avatar(24),
    phoneNumber: '+91 9090909090',
    country: 'India',
    address: 'Pune',
    state: 'Maharashtra',
    city: 'Pune',
    zipCode: '411111',
    about: 'Software Developer',
    role: 'admin',
    isPublic: true,
  };

  return { user };
}
