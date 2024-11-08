import { defineAbility } from '@casl/ability';

export function defineAbilitiesFor(logintype) {
  return defineAbility((can) => {
    can('read', 'Post'); 

    if (logintype === 'admin') {
      can('read', 'Post'); 
    } else if (logintype === 'user1') {
      can('read', 'Post', { author: { $in: ['user1', 'user2'] } }); 
    } else if (logintype === 'user2') {
      can('read', 'Post', { author: 'user2' }); 
    }
  });
}