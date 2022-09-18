import { User } from "./../models/userDB";
import { Partner } from "../models/partnerDB";
import { Admin } from "../models/adminDB";
import { Response, Request } from "express";
import admins from "../models/adminDB";
import partners from "../models/partnerDB";
import Users from "../models/userDB";

//-------------------------customer---------------------------------
export const getCustomers = async (req: Request, res: Response) => {
  Users.find((err, users:User[]) => {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
};

export const getCustomerById = (req: Request, res: Response) => {
  const { id } = req.params;
  Users.findById(id, (err: any, user: User) => {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
};

export const deleteCustomer = (req: Request, res: Response) => {
  const { id } = req.params;
  Users.findByIdAndDelete(id, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "delete success",
      });
    }
  });
};

export const editCustomerByAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const admin = await admins.findById(req.user?.admin_id);
  if (admin !== undefined) {
    Users.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      (err: any, user: User) => {
        if (err) {
          console.log(err);
        } else {
          res.json(user);
        }
      }
    );
  } else {
    res.status(400).json({ err: "ไม่มีสิทธิแก้ไข" });
  }
};

export const editCustomerByCustomer = async (req: Request, res: Response) => {
  Users.findByIdAndUpdate(
    req.user?.user_id,
    {
      $set: req.body,
    },
    (err: any, user: User) => {
      if (err) {
        console.log(err);
        res.status(400).json({ err: "ไม่มีสิทธิแก้ไข" });
      } else {
        res.json(user);
      }
    }
  );
};

//-----------------------partner-------------------------------------------

export const getAllPartner = (req: Request, res: Response) => {
  partners.find((err, partners:Partner[]) => {
    if (err) {
      console.log(err);
    } else {
      res.json(partners);
    }
  });
};

export const getPartnerVerify = (req: Request, res: Response) => {
  partners.find({ status: "verification" }, (err: any, partners: Partner[]) => {
    if (err) {
      console.log(err);
    } else {
      res.json(partners);
    }
  });
};

export const getPartnerApprove = (req: Request, res: Response) => {
  partners.find({ status: "approve" }, (err: any, partners: Partner[]) => {
    if (err) {
      console.log(err);
    } else {
      res.json(partners);
    }
  });
};
export const getPartnerDisApprove = (req: Request, res: Response) => {
  partners.find({ status: "disapprove" }, (err: any, partners: Partner[]) => {
    if (err) {
      console.log(err);
    } else {
      res.json(partners);
    }
  });
};

export const getPartnerById = (req: Request, res: Response) => {
  const { id } = req.params;
  partners.findById(id, (err: any, partner: Partner) => {
    if (err) {
      console.log(err);
    } else {
      res.json(partner);
    }
  });
};

export const updateStatusPartner = async (req: Request, res: Response) => {
  const { id } = req.params;
  const admin = await admins.findById(req.user?.admin_id);

  if (admin !== undefined) {
    partners.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      (err: any, partner: User) => {
        if (err) {
          console.log(err);
        } else {
          res.json(partner);
        }
      }
    );
  } else {
    res.status(400).json({ err: "ไม่มีสิทธิแก้ไข" });
  }
};

export const editPartnerByAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const admin = await admins.findById(req.user?.admin_id);
  if (admin !== undefined) {
    partners.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      (err: any, partner: Partner) => {
        if (err) {
          console.log(err);
        } else {
          res.json(partner);
        }
      }
    );
  } else {
    res.status(400).json({ err: "ไม่มีสิทธิแก้ไข" });
  }
};

export const editPartnerByPartner = async (req: Request, res: Response) => {
  partners.findByIdAndUpdate(
    req.user?.partner_id,
    {
      $set: req.body,
    },
    (err: any, partner: Partner) => {
      if (err) {
        console.log(err);
      } else {
        res.json(partner);
      }
    }
  );
};

export const deletePartner = (req: Request, res: Response) => {
  const { id } = req.params;
  partners.findByIdAndDelete(id, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "delete success",
      });
    }
  });
};

//-------------------admin-------------------------------------------------

export const getAllAdmins = (req: Request, res: Response) => {
  admins.find((err, admin:Admin[]) => {
    if (err) {
      console.log(err);
    } else {
      res.json(admin);
    }
  });
};

export const getAdminById = (req: Request, res: Response) => {
  const { id } = req.params;
  admins.findById(id, (err: any, admin: Admin) => {
    if (err) {
      console.log(err);
    } else {
      res.json(admin);
    }
  });
};

export const editAdminByAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const admin = await admins.findById(req.user?.admin_id);
  if (admin !== undefined) {
    admins.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      (err: any, admin: Admin) => {
        if (err) {
          console.log(err);
        } else {
          res.json(admin);
        }
      }
    );
  } else {
    res.status(400).json({ err: "ไม่มีสิทธิแก้ไข" });
  }
};

export const editAdminBySelf = async (req: Request, res: Response) => {
  admins.findByIdAndUpdate(
    req.user?.admin_id,
    {
      $set: req.body,
    },
    (err: any, admin: Admin) => {
      if (err) {
        console.log(err);
      } else {
        res.json(admin);
      }
    }
  );
};

export const deleteAdmin = (req: Request, res: Response) => {
  const { id } = req.params;
  admins.findByIdAndDelete(id, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "delete success",
      });
    }
  });
};
