$(document).ready(function() {
  var bck = chrome.extension.getBackgroundPage();
  var clearButton = document.getElementById('clear');
  var passwordButton = document.getElementById('newPass');
  var nonPronPassBtn = document.getElementById('newStrong');
  var natoButton = document.getElementById('nato');
  chrome.storage.local.get(['Password'], function(result) {
    bck.console.log("From storage " + result.Password);
    $("#password").html(result.Password);
  });
  passwordButton.addEventListener('click', function() {
    // Ensure phonetic results are hidden to avoid confusion with multiple button presses
    $("#conversionResults").hide();
    $.ajax({
      url:"http://www.dinopass.com/password/strong",
      dataType: "text",
      error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + ': ' + errorThrown);
            },
      success: function(data) {
        $("#password").html(data);
        chrome.storage.local.set({'Password': data});
        $("#password").show();
        copyToClipboard(data);
        $("#copied").html("Copied to Clipboard");
        console.log(data);
      }
    })
  });
  natoButton.addEventListener('click', function() {
    data=$("#password").html();
    convertTextToNato(data);
  });
  clearButton.addEventListener('click', function() {
    chrome.storage.local.set({'Password': ''});
    $("#password").html('');
  });
});

function copyToClipboard( text ){
                var copyDiv = document.createElement('div');
                copyDiv.contentEditable = true;
                document.body.appendChild(copyDiv);
                copyDiv.innerHTML = text;
                copyDiv.unselectable = "off";
                copyDiv.focus();
                document.execCommand('SelectAll');
                document.execCommand("Copy", false, null);
                document.body.removeChild(copyDiv);
              }

function convertTextToNato(textToConvert)
{
    data = textToNato(textToConvert);
    document.getElementById('conversionResults').innerHTML = data.replace(/(\n)+/g, '<br />');
    $("#conversionResults").show();
}

function textToNato(text)
{
    var newline = '<br />';
    var results = '';
    orig = text;
    text = text.toLowerCase();
    
    for (var i=0; i < text.length; i++)
    {
        if (text.charAt(i) != orig.charAt(i)) {
          results = results + "Upper Case ";
        }
        switch (text.charAt(i))
        {
            case 'a': results = results + 'Alfa\n'; break;
            case 'b': results = results + 'Bravo\n'; break;
            case 'c': results = results + 'Charlie\n'; break;
            case 'd': results = results + 'Delta\n'; break;
            case 'e': results = results + 'Echo\n'; break;
            case 'f': results = results + 'Foxtrot\n'; break;
            case 'g': results = results + 'Golf\n'; break;
            case 'h': results = results + 'Hotel\n'; break;
            case 'i': results = results + 'India\n'; break;
            case 'j': results = results + 'Juliett\n'; break;
            case 'k': results = results + 'Kilo\n'; break;
            case 'l': results = results + 'Lima\n'; break;
            case 'm': results = results + 'Mike\n'; break;
            case 'n': results = results + 'November\n'; break;
            case 'o': results = results + 'Oscar\n'; break;
            case 'p': results = results + 'Papa\n'; break;
            case 'q': results = results + 'Quebec\n'; break;
            case 'r': results = results + 'Romeo\n'; break;
            case 's': results = results + 'Sierra\n'; break;
            case 't': results = results + 'Tango\n'; break;
            case 'u': results = results + 'Uniform\n'; break;
            case 'v': results = results + 'Victor\n'; break;
            case 'w': results = results + 'Whiskey\n'; break;
            case 'x': results = results + 'Xray\n'; break;
            case 'y': results = results + 'Yankee\n'; break;
            case 'z': results = results + 'Zulu\n'; break;
            case ' ': results = results + 'Space\n'; break;
            case '0': results = results + 'Zero\n'; break;
            case '1': results = results + 'One\n'; break;
            case '2': results = results + 'Two\n'; break;
            case '3': results = results + 'Three\n'; break;
            case '4': results = results + 'Four\n'; break;
            case '5': results = results + 'Five\n'; break;
            case '6': results = results + 'Six\n'; break;
            case '7': results = results + 'Seven\n'; break;
            case '8': results = results + 'Eight\n'; break;
            case '9': results = results + 'Nine\n'; break;
            case '!': results = results + 'Exclimation mark\n'; break;
            case '"': results = results + 'Double Quotes\n'; break;
            case '£': results = results + 'UK Pound\n'; break;
            case '$': results = results + 'Dollar\n'; break;
            case '%': results = results + 'Percent\n'; break;
            case '^': results = results + 'Circumflex\n'; break;
            case '&': results = results + 'And\n'; break;
            case '*': results = results + 'Asterisk\n'; break;
            case '(': results = results + 'Open Round Bracker\n'; break;
            case ')': results = results + 'Close Round Bracket\n'; break;
            case '-': results = results + 'Minus\n'; break;
            case '_': results = results + 'Underscore\n'; break;
            case '+': results = results + 'Plus\n'; break;
            case '=': results = results + 'Equals\n'; break;
            case '[': results = results + 'Open Square Bracket\n'; break;
            case '{': results = results + 'Open Curly Bracket\n'; break;
            case ']': results = results + 'Close Square Bracket\n'; break;
            case '}': results = results + 'Close Curly Bracket\n'; break;
            case ':': results = results + 'Colon\n'; break;
            case ';': results = results + 'Semi-Colon\n'; break;
            case '@': results = results + 'At Symbol\n'; break;
            case '\'': results = results + 'Single Quote\n'; break;
            case '<': results = results + 'Lower Than\n'; break;
            case ',': results = results + 'Comma\n'; break;
            case '>': results = results + 'Greater Than\n'; break;
            case '.': results = results + 'Full Stop\n'; break;
            case '/': results = results + 'Forward Slash\n'; break;
            case '?': results = results + 'Question Mark\n'; break;
            case '\\': results = results + 'Back Slash\n'; break;
            case '|': results = results + 'Pipe\n'; break;
            case '#': results = results + 'Hash\n'; break;
            case '~': results = results + 'Tilda\n'; break;


            default: results = results + 'NOT DEFINED' + '\n';
        }
    }
    
    return results;
}
