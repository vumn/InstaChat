import {Platform} from 'react-native';

const HOST = Platform.select({
    ios: "192.188.2.102",
    android: "192.188.2.102", 
    default: "localhost"
});

export const API_BASE_URL = `http://${HOST}:3000`;
export const WS_URL=`ws://${HOST}:3000`;