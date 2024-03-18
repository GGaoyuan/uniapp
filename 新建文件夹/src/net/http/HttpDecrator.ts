import http from '@/utils/request';

export function httpPost(url, data){
    return function(target, name, descriptor) {
        let oldVal = descriptor.value;
        descriptor.value = function(){
            let ob = http.post(url, data);
            Promise.resolve(ob)
            .then((res) => {
                oldVal.apply(this, res.data);
            }).catch((err) => {
                oldVal.apply(this, {}, err);
            });
        }
    }
}