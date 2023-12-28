import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveMenuName } from "store/reducers/auth/authSlice";
import { fetchKeycloak, fetchUserProfile } from "store/reducers/auth/authThunk";
import { decrypt } from "utils/Chiper";
import PageContent from "./index";
import ErrorContent from "components/page";
import { setKeycloak } from "utils/DataKeycloak";

const id = document.getElementById("MainContent-container");

function MainRoute({ historyParent }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const getAttribute = (qualifiedName) =>
    id !== null
      ? id.getAttribute(qualifiedName) || "unknown qualifiedName"
      : "";
  const pathValue = getAttribute("pathvalue");
  const pathName = pathValue !== "" ? getAttribute("pathname") : "/path-name";
  const menuName = pathValue !== "" ? getAttribute("menuname") : "Menu Name";
  let stateReduxKeycloak =
    pathValue !== "" ? decrypt(pathValue) : auth.keycloakItem.refresh_token;

  useEffect(() => {
    dispatch(
      saveMenuName({
        menuName,
        pathName,
        pathValue,
      })
    );
    dispatch(fetchKeycloak(stateReduxKeycloak))
      .unwrap()
      .then((resp) => {
        setKeycloak({
          access_token: resp.item.access_token,
          refresh_token: resp.item.refresh_token,
        });
        dispatch(fetchUserProfile(resp.accessKeycloak.nip));
      })
      .catch((error) => {
        console.log("error keycloack", error);
      });
  }, [dispatch, stateReduxKeycloak, menuName, pathName, pathValue]);

  if (auth.isError || auth.loading) {
    return (
      <ErrorContent
        onReload={() => dispatch(fetchKeycloak(stateReduxKeycloak))}
        error={auth.isError}
        loading={auth.loading}
        message={auth.errorMessage}
      />
    );
  }

  return <PageContent />;
}

export default MainRoute;
