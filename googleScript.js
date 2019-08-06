function onFormSubmit(e) {

  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  var values = e.values; //can also use e.namedValues for object rather than array
  var aliases = GmailApp.getAliases();
  var customerEmail = values[3];
  var emailType = values[4];

  var fullName = values[2];
  var firstName = fullName.split(" ")[0];
  var firstInitial = firstName.charAt(0) + ".";
  var lastName = fullName.split(" ")[1];

  var message = "Hi " + firstName + "," + "\n \n test";

  var subject = "Secure Document Upload - " + firstInitial + " " + lastName + " #secure";
  var subjectDispute = "Dispute - " + firstName + " " + lastName + " #secure";
  var subjectClaim = "Claim - " + firstName + " " + lastName;

  var checkFile = DriveApp.getFileById('1fXfj1fxAhw6VnqS8ritkGM6DB9bZg'); // can be accessed via sharing link URL
  var podFile = DriveApp.getFileById('1NhKriNRlo1KHo4DJ_2wVVm7LL0v__');
  var disputeFile = DriveApp.getFileById('1GU6BryZWStPxxkpT2rVcZiEnuNXHT');
  var claimFile = DriveApp.getFileById('1VC4sasYvF1klKcvHsHobP8SnMVFoD');


  var messageCheck = "Hi " + firstName + "," + "\n \nHere is the form for your check!";

  var messagePod = "Hi " + firstName + "," + "\n \nYou'll find the beneficiary request form attached.";

  var messageDocRequest = "Hi " + firstName + "," + "\n \nPlease attach your documents!";

  var messageDispute = "Hi " + firstName + "," + "\n \nHere is the dispute form we promised!";

  var messageClaim = "Hi " + firstName + "," + "\n \nHere is the email about a claim!";

  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();

  Logger.log("Simple Aliases: " + aliases);
  Logger.log(values);
  Logger.log("Submitter: " + values[1]);
  Logger.log("Full Name: " + fullName);
  Logger.log("First Name: " + firstName);
  Logger.log("First Initial: " + firstInitial);
  Logger.log("Email Type: " + emailType);
  Logger.log("Customer Email: " + customerEmail);
  Logger.log(checkFile);
  Logger.log("Remaining Emails: " + emailQuotaRemaining);

  if (emailType === "Check Form") {
    GmailApp.sendEmail(customerEmail, subject, messageCheck, {
      attachments: checkFile,
      from: aliases[1],
      name: 'Support',
      replyTo: aliases[1]
    })

  } else if (emailType === "Next of Kin") {
    GmailApp.sendEmail(customerEmail, subject, messagePod, {
      attachments: podFile,
      from: aliases[1],
      name: 'Support',
      replyTo: aliases[1]
    })

  } else if (emailType === "Demographic Update") {
    GmailApp.sendEmail(customerEmail, subject, messageDocRequest, {
      from: aliases[1],
      name: 'Support',
      replyTo: aliases[1]
    })

  } else if (emailType === "Dispute Update") {
    GmailApp.sendEmail(customerEmail, subjectDispute, messageDispute, {
      attachments: disputeFile,
      from: aliases[2],
      name: 'Support',
      replyTo: aliases[2]
    })

  } else if (emailType === "Claim Update") {
    GmailApp.sendEmail(customerEmail, subjectClaim, messageClaim, {
      attachments: claimFile,
      from: aliases[3],
      name: 'Support',
      replyTo: aliases[3]
    })

  } else {
    GmailApp.sendEmail(customerEmail, subject, messageDocRequest, {
      from: aliases[0],
      name: 'Support',
      replyTo: aliases[0]
    })
  }

  lock.releaseLock();

};
