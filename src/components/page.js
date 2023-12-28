import React from 'react'
import { Result, Button, Card, Skeleton } from "antd";
import { useHistory } from "react-router-dom";

function Index({error='', loading='', children='', onReload=()=>{}, message=''}) {
    let history = useHistory();
    // console.log('--- render body wrapper');
    return (
        <>
        {
            error || loading ?
            <Card>
                <Skeleton
                    active
                    loading={loading}
                    paragraph={{rows:8}}
                >
                    <Result
                    status="error"
                    title={"Terjadi Kesalahan"}
                    subTitle={message}
                    extra={[
                        <Button type="danger" key="muat" onClick={onReload}>
                            Muat Ulang
                        </Button>,
                        <Button type="primary" key="kembali" onClick={()=>history.goBack()} style={{marginLeft: 20}}>
                            Kembali
                        </Button>
                        ]}
                    />
                </Skeleton>
            </Card>
            :
            children
        }
            
        </>
    )
}

export default React.memo(Index)
