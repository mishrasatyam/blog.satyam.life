import {browser} from '$app/env'
import { writable } from 'svelte/store';
export const color_mode = writable((browser?localStorage.getItem('color_mode'):'light')||'light')
