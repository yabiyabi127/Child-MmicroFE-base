import jwtDecode from "jwt-decode";
import axios from "axios";
import { getKeycloak, setKeycloak } from "./DataKeycloak";
import { API_AMWS } from "setup/application.properties";

let initialValue = {};

/*
USAGE getUser()
const dataUser = getUser()

yang sebelumnya
const dataUser = localStorage.getItem("dataUser")
*/
export function getUser() {
  return initialValue;
}

/* setUser(params)
USAGE
setUser({
nama: 'raditsan',
kodeKantor: '999999
})

atau

setUser({
...getUser() << akan mengambil data yang lama & menambahkan param yang baru,
paramBaru: 'foo',
paramLama: 'bar'
})

yang sebelumnya
localStorage.setItem(JSON.stringify({
nama: 'raditsan',
kodeKantor: '999999
}, 'dataUser'))
*/
export function setUser(params) {
  initialValue = params;
}

export async function getUserAccessToken() {
  const initialAccess = getKeycloak().access_token;
  const refreshToken = getKeycloak().refresh_token;
  const decoded = jwtDecode(initialAccess);
  const { exp } = decoded;
  if (!initialAccess || initialAccess === "") {
    return "";
  } else if (exp < Date.now() / 1000) {
    try {
      const { data } = await axios.post(
        `${API_AMWS}/v1/user/update-token2`,
        null,
        {
          headers: {
            Authorization: refreshToken,
          },
        }
      );
      const { access_token } = data.item;
      setKeycloak(data.item);
      return access_token;
    } catch (e) {
      // alert('failed to get access ' + e.message)
      return "";
    }
  } else {
    return initialAccess;
  }
}

export async function getAccessHeader() {
  const headers = { headers: {} };
  try {
    const accesstToken = await getUserAccessToken();
    if (accesstToken === "") {
      return headers;
    }
    return {
      headers: {
        Authorization: `Bearer ${accesstToken}`,
      },
    };
  } catch (e) {
    return headers;
  }
}

export function rsaEncription(value) {
  // eslint-disable-next-line no-undef
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIegmiOBL7+JU99VeDdlq6lghCucD0UhgZ1ugG5QvZZOdMV8Sc4LkghnIHzaBCy5wAPZe3ToNhSnTCj7f4bO9OxvQm0b/rPBH5VwMI0qYmoSLkEM0uF6ZzgBzB8fUMFzpVN4/HFglpA2hYrj5Om+y0QjQyVdQK1lc5/vtzQEaypQIDAQAB"
  );
  return jsEncrypt.encrypt(value);
}
