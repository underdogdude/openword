import liff from '@line/liff';

var lineToken = '';
function liffInit() {
    if (!liff.isInClient()) {
        alert('isn"s in client');
        // window.location = "https://line.me/R/ti/p/@pep2892m"
    }
    var liffId = '1654918729-EjBZQgb1';
    liff.init({
        liffId: liffId || ""
    }).then(() => {
        lineToken = liff.getIDToken();
        if ( lineToken != null ) {
            alert(lineToken);
            console.log('lineToken ', lineToken)
            alert("FUCK LINE LIFF");
        }
        appInit();
    });
}

function appInit() {
    if (!liff.isLoggedIn() && !liff.isInClient()) {
        // liff.login();
    } else {
      liff.getProfile().then(async (profile) => {
        alert(JSON.stringify(profile));
        console.log(profile , 'fucnink profile');
      });
    }
}

liffInit()