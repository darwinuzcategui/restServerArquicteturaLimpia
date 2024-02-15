
import {hashSync,compareSync} from 'bcryptjs';

export class BcryAdapter {
    static hash( password: string): string {
        return hashSync ( password );
    }

static compare(password:string , hashed: string ):boolean {
    return compareSync(password, hashed);
}


}

