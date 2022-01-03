const data = {
  accounts: require("../data/accounts.json"),
  setAccounts: function (accounts) {
    this.accounts = accounts;
  },
};

const getAllAccounts = (req, res) => {
  res.status(200).json(data.accounts);
};

const openAccount = (req, res) => {
  if (
    (!req.body.accountHolderName && req.body.accountHolderName === "") ||
    (!req.body.gender && req.body.gender === "") ||
    (!req.body.balance && req.body.balance === "")
  ) {
    res.status(206).json({ message: "Not sufficient data!" });
  }
  const newAccount = {
    accountNo: data.accounts[data.accounts.length - 1].accountNo + 1 || 1,
    accountHolderName: req.body.accountHolderName,
    gender: req.body.gender,
    balance: req.body.balance,
  };
  data.setAccounts([...data.accounts, newAccount]);
  res.status(201).json(data.accounts);
};

const updateAccount = (req, res) => {
  if (!req.body.accountNo) {
    res.status(206).json({ message: "Account number is required!" });
  }
  const newAccount = data.accounts.find(
    (account) => account.accountNo === parseInt(req.body.accountNo)
  );
  if (!newAccount) {
    res
      .status(400)
      .json({ message: `Account number ${req.body.accountNo} not found` });
  }
  const updatedAccounts = data.accounts.map((account) => {
    if (account.accountNo === parseInt(req.body.accountNo)) {
      (account.accountHolderName = req.body.accountHolderName
        ? req.body.accountHolderName
        : account.accountHolderName),
        (account.gender = req.body.gender ? req.body.gender : account.gener);
    }
    return account;
  });

  data.setAccounts(updatedAccounts);
  res.status(200).json(data.accounts);
};

const closeAccount = (req, res) => {
  if (!req.body.accountNo) {
    res.status(206).json({ message: "Account number is required!" });
  }
  const newAccount = data.accounts.find(
    (account) => account.accountNo === parseInt(req.body.accountNo)
  );
  if (!newAccount) {
    res
      .status(400)
      .json({ message: `Account number ${req.body.accountNo} not found` });
  }
  const filteredAcounts = data.accounts.filter(
    (account) => account.accountNo !== parseInt(req.body.accountNo)
  );
  data.setAccounts(filteredAcounts);
  res.status(200).json(data.accounts);
};

const getOnAccountByAccountNo = (req, res) => {
  if (!req.params.accountNo || req.params.accountNo === "") {
    res.status(206).json({ message: "Account number is required!" });
  }
  const account = data.accounts.find(
    (account) => account.accountNo === parseInt(req.params.accountNo)
  );
  if (!account) {
    res
      .status(400)
      .json({ message: `Account number ${req.params.accountNo} not found!` });
  }
  res.status(200).json(account);
};

module.exports = { getAllAccounts, openAccount, updateAccount, closeAccount, getOnAccountByAccountNo };
