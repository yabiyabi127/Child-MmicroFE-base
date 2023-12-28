import React from 'react';
import MonitoringTableCarnet from './MonitoringTableCarnet';

const MonitoringCarnet = () => {

    return (
        <div>
            <div className="row">
                <div className="kt-portlet">
                    <div className="kt-subheader   kt-grid__item" id="kt_subheader">
                        <div className="kt-subheader__main">
                            <h3 className="kt-subheader__title">Carnet</h3>
                            <span className="kt-subheader__separator kt-subheader__separator--v" />
                            <h3 className="kt-subheader__title">Monitoring Carnet</h3>
                        </div>
                    </div>

                    <div className="m-3">
                        <div className="kt-portlet">
                            <div className="kt-portlet__body">
                                <MonitoringTableCarnet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default MonitoringCarnet;
