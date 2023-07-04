import _sortBy from "lodash.sortby";
import _keyby from "lodash.keyby";
import { jsPDF } from "jspdf";
import { store } from "store";
import html2canvas from "html2canvas";
//
export function sortBy(array: [], field: string, sorting: string) {
  const data = _sortBy(Array.isArray(array) ? array : [], field, sorting);
  return sorting === "asc" ? data : data.reverse();
}

export function filterObjectArray(array = [], string: any = "", fields = []) {
  const _string = string.toLowerCase();
  if (!string || !string.length) {
    return array;
  }

  const _data = array.filter(function (obj: any) {
    const values: string[] = Object.values(obj).map((item: any) =>
      String(item).toLowerCase()
    );
    for (const index in values) {
      if (values[index].includes(_string)) {
        return true;
      }
    }
    return false;
  });
  return _data;
}

export function getBodyHeight(callback: (height: any) => void) {
  let body = document.body,
    html = document.documentElement;

  let _height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  callback(_height);
}

export function getQueryString(variable: string, location?: any) {
  if (variable) {
    try {
      let query = location
        ? location.search.substring(1)
        : window.location.search.substring(1);
      let vars = query.split("&");
      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) {
          return pair[1];
        }
      }
    } catch {
      return false;
    }
  }
  return false;
}

export const createPDF = (element: HTMLElement, preview?: boolean) => {
  const filename = String(getQueryString("dataset_name"))
    .toString()
    .replace("%20", "_")
    .toUpperCase();

  const initialPadding = element.style.padding;
  element.style.padding = "0";
  element.style.boxShadow = "none";
  element.style.backgroundColor = "white";

  html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    scrollY: 0,
    backgroundColor: "white",
    scale: 3,
  }).then((canvas: HTMLCanvasElement) => {
    const image = { type: "JPEG", quality: 0.2 };
    const margin = [0.5, 0.5];

    let imgWidth = 8.5;
    let pageHeight = 11;

    let innerPageWidth = imgWidth - margin[0] * 2;
    let innerPageHeight = pageHeight - margin[1] * 2;

    // Calculate the number of pages.
    let pxFullHeight = canvas.height;
    let pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
    let nPages = Math.ceil(pxFullHeight / pxPageHeight);

    // Define pageHeight separately so it can be trimmed on the final page.
    pageHeight = innerPageHeight;

    // Create a one-page canvas to split up the full image.
    let pageCanvas = document.createElement("canvas");
    let pageCtx = pageCanvas.getContext("2d");

    pageCanvas.width = canvas.width;
    pageCanvas.height = pxPageHeight;

    // Initialize the PDF.
    let pdf = new jsPDF("p", "in", [8.5, 11]);
    pdf.setFillColor("#fff");
    pdf.rect(0, 0, 210, 700, "F");

    for (let page = 0; page < nPages; page++) {
      if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
        pageCanvas.height = pxFullHeight % pxPageHeight;
        pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
      }

      // Display the page.
      let w = pageCanvas.width;
      let h = pageCanvas.height;
      pageCtx?.fillRect(0, 0, w, h);
      pageCtx?.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

      // Add the page to the PDF.
      if (page > 0) pdf.addPage();
      let imgData = pageCanvas.toDataURL("image/" + image.type, image.quality);
      pdf.addImage(
        imgData,
        image.type,
        margin[1],
        margin[0],
        innerPageWidth,
        pageHeight
      );
    }

    pdf.setProperties({
      title: filename,
      author: "Peleza International",
      creator: "Peleza International Website",
      subject: "Report",
    });

    if (preview) {
      pdf.output("dataurlnewwindow");
    } else {
      pdf.save(filename);
    }
    element.style.padding = initialPadding;
  });
};
export const toggleModal = () => {
  document.getElementsByTagName("html")[0].classList.toggle("modal-open");
};

export const requestKey = () =>
  `${window.location.pathname}#${new Date().getTime()}`;

export const arrayToObject = (array: object[], key: string) => {
  return _keyby(array, function (obj: any) {
    return obj[key];
  });
};

export function truncate(str: string, limit: number) {
  return String(str).toString().length > limit
    ? str.substr(0, limit - 1) + "&hellip;"
    : str;
}

export function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export function fadeOut(element: string, callback: () => void) {
  try {
    let elem = document.getElementById(element);
    if (elem) {
      var newValue = 1;
      elem.style.opacity = "1";

      let fadeOutInterval: any;
      let stop = false;

      fadeOutInterval = setInterval(function () {
        if (newValue > 0) {
          newValue -= 0.01;
        } else if (elem && newValue < 0) {
          elem.style.opacity = "0";
          elem.style.display = "none";
          stop = true;
          clearInterval(fadeOutInterval);
          if (callback) callback();
        }

        if (elem && !stop) elem.style.opacity = newValue.toString();
      }, 10);
    }
  } catch (e) {}
}

export function getDate() {
  const global = store.getState().global;
  const today = new Date();
  const month = String(global.months[today.getMonth()])
    .toUpperCase()
    .slice(0, 3);

  const date = today.getDate();

  return `${date} ${month} ${today.getFullYear()}`;
}

export function checkOverflow(el: HTMLElement) {
  var curOverflow = el.style.overflow;

  if (!curOverflow || curOverflow === "visible") el.style.overflow = "hidden";

  var isOverflowing =
    el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

  el.style.overflow = curOverflow;

  return isOverflowing;
}
var c2,
  c3 = 0;
export const Base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function (e: any) {
    var t = "";
    var n, r, i, s, o, u, a;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = ((n & 3) << 4) | (r >> 4);
      u = ((r & 15) << 2) | (i >> 6);
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64;
      } else if (isNaN(i)) {
        a = 64;
      }
      t =
        t +
        this._keyStr.charAt(s) +
        this._keyStr.charAt(o) +
        this._keyStr.charAt(u) +
        this._keyStr.charAt(a);
    }
    return t;
  },
  decode: function (e: any) {
    var t = "";
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = (s << 2) | (o >> 4);
      r = ((o & 15) << 4) | (u >> 2);
      i = ((u & 3) << 6) | a;
      t = t + String.fromCharCode(n);
      if (u !== 64) {
        t = t + String.fromCharCode(r);
      }
      if (a !== 64) {
        t = t + String.fromCharCode(i);
      }
    }
    t = Base64._utf8_decode(t);
    return t;
  },
  _utf8_encode: function (e: any) {
    e = e.replace(/\r\n/g, "\n");
    var t = "";
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode((r >> 6) | 192);
        t += String.fromCharCode((r & 63) | 128);
      } else {
        t += String.fromCharCode((r >> 12) | 224);
        t += String.fromCharCode(((r >> 6) & 63) | 128);
        t += String.fromCharCode((r & 63) | 128);
      }
    }
    return t;
  },
  _utf8_decode: function (e: any) {
    var t = "";
    var n = 0;
    var r = (c2 = 0);
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++;
      } else if (r > 191 && r < 224) {
        // eslint-disable-next-line
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
        n += 2;
      } else {
        c2 = e.charCodeAt(n + 1);
        c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode(
          ((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        n += 3;
      }
    }
    return t;
  },
};
