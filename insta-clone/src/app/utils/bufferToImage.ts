import { DomSanitizer } from "@angular/platform-browser";

export class BufferToImage{
    static bufferToImage(image, domSanitizer: DomSanitizer){
        let TYPED_ARRAY = new Uint8Array(image.data);

        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');
        
        let base64String = btoa(STRING_CHAR);
        
        return domSanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ` + base64String);
    }
}