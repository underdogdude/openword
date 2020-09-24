import liff from '@line/liff';

var lineToken = '';
function liffInit() {
    alert('LIFF INITT');
    // if (!liff.isInClient()) {
    //     window.location = "https://line.me/R/ti/p/@pep2892m"
    // }
    var liffId = '1654918729-EjBZQgb1';
    alert(liffId);
    liff.init({
        liffId: liffId
    }).then(() => {
        alert('in tgen');
        lineToken = liff.getIDToken();
        alert(lineToken);
        if ( lineToken != null ) {
            console.log('lineToken ', lineToken)
        }
        appInit();
    });
}

function appInit() {
    alert('APP INIT');
    if (!liff.isLoggedIn() && !liff.isInClient()) {
        // liff.login();
    } else {
      liff.getProfile().then(async (profile) => {
        alert(JSON.stringify(profile))
        console.log(profile , 'fucnink profile');
      });
    }
}

liffInit()