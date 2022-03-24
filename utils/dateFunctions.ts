import { formatDistanceToNow } from 'date-fns';
//import { en } from 'date-fns/locale';



export const getFormatDistanceToNow = ( date: number ) => {

    const fromNow = formatDistanceToNow( date );
    return `Created ${fromNow} ago`;

}