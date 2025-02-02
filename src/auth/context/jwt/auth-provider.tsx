'use client';

import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}
const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const initialize = useCallback(async () => {
  //   try {
  //     const accessToken = sessionStorage.getItem(STORAGE_KEY);
  
  //     if (accessToken && isValidToken(accessToken)) {
  //       setSession(accessToken);
  
  //       const res = await axios.get(endpoints.auth.me);
  //       const { data: user } = res.data;
  
  //       dispatch({
  //         type: Types.INITIAL,
  //         payload: {
  //           user: {
  //             ...user,
  //             accessToken,
  //           },
  //         },
  //       });
  //     } else {
  //       dispatch({
  //         type: Types.INITIAL,
  //         payload: {
  //           user: null,
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     dispatch({
  //       type: Types.INITIAL,
  //       payload: {
  //         user: null,
  //       },
  //     });
  //   }
  // }, []);
  


  const initialize = useCallback(async () => {
    try {
      const token = sessionStorage.getItem('accessToken');
      
      if (token && isValidToken(token)) {
        setSession(token);

        
        
        // Decode token to get user data
        const decodedToken = jwtDecode(token);
        const userData = {
          _id: decodedToken.userId,
          name: decodedToken.name,
          userName: decodedToken.userName,
          phone: decodedToken.phone,
          role: decodedToken.role
        };
  
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...userData,
              accessToken: token
            }
          }
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null
          }
        });
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null
        }
      });
    }
  }, []);

  
  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (userName: string, password: string) => {
    const data = {
      userName,
      password,
    };

    const res = await axios.post(endpoints.auth.login, data);

  //   const { accessToken, user } = res.data;

  //   setSession(accessToken);

  //   dispatch({
  //     type: Types.LOGIN,
  //     payload: {
  //       user: {
  //         ...user,
  //         accessToken,
  //       },
  //     },
  //   });
  // }, []);

  const { token, data: userData } = res.data;

  setSession(token);

  dispatch({
    type: Types.LOGIN,
    payload: {
      user: {
        ...userData,
        accessToken: token,
      },
    },
  });
}, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const data = {
        email,
        password,
        firstName,
        lastName,
      };

      const res = await axios.post(endpoints.auth.register, data);

      const { accessToken, user } = res.data;

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {
            ...user,
            accessToken,
          },
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
