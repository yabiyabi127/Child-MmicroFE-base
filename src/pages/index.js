import { NotFound } from "components/ErrorContent";
import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ROOT_PATH } from "setup/application.properties";
import MonitoringCarnet from "./monitoring/MonitoringCarnet";
import BrowseLaporanPeriodik from "./LaporanPeriodik/BrowseLaporanPeriodik";
import RekamLaporanPeriodik from "./LaporanPeriodik/RekamLaporanPeriodik";
import DetailLaporanPeriodik from "./LaporanPeriodik/DetailLaporanPeriodik";

export default function PageContent() {
  return (
    <>
      <Suspense fallback="Memuat...">
        <Switch>
          <Redirect from={"/login"} to={"/"} />
          <Route
            path={`${ROOT_PATH}/laporan-periodik/rekam`}
            exact
            component={(props) => <RekamLaporanPeriodik {...props} />}
          />
          <Route
            path={`${ROOT_PATH}/laporan-periodik`}
            exact
            component={(props) => <BrowseLaporanPeriodik {...props} />}
          />
          <Route
            path={`${ROOT_PATH}/laporan-periodik/:id`}
            exact
            component={(props) => <DetailLaporanPeriodik {...props} />}
          />
          <Route
            exact
            path={`${ROOT_PATH}/monitoring`}
            component={(props) => <MonitoringCarnet />}
          />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <div id="drawer-container"></div>
    </>
  );
}
