import express from 'express';
import { Brewer, Manufacturer, User } from '../entity';
import { CreateBrewerApiRequest } from '../interfaces/brew/create-brewer';
import { CreateManufacturerApiRequest } from '../interfaces/brew/create-manufacturer';
import { AuthGuard } from '../middlewares/auth-guards';
import { authService } from '../services/auth.service';

const router = express.Router();

router.post('/method', AuthGuard, async (_req, _res) => {});

router.get('/brewer', AuthGuard, async (_req, res) => {
  const uid = res.locals.user.userId;
  let user: User | undefined = undefined;
  try {
    user = await authService.findUserById(uid, [
      'brewers',
      'brewers.manufacturer',
    ]);
  } catch (err) {
    const response = {
      error: {
        type: 'internal_error',
        message: 'internal server error',
      },
    };
    return res.status(500).send(response);
  }

  if (!user) {
    const response = {
      error: {
        type: 'fetch_error',
        message: 'user not found',
      },
    };
    return res.status(400).send(response);
  }

  const response = {
    brewers: user.brewers,
  };
  return res.send(response);
});

router.post('/brewer', AuthGuard, async (req, res) => {
  const payload: CreateBrewerApiRequest = req.body;
  const uid = res.locals.user.userId;
  let user: User | undefined = undefined;
  try {
    user = await authService.findUserById(uid);
  } catch (err) {
    const response = {
      error: {
        type: 'internal_error',
        message: 'internal server error',
      },
    };
    return res.status(500).send(response);
  }

  if (!user) {
    const response = {
      error: {
        type: 'fetch_error',
        message: 'user not found',
      },
    };
    return res.status(400).send(response);
  }

  let manufacturer: Manufacturer | undefined = undefined;
  try {
    manufacturer = await Manufacturer.findOne(payload.manufacturer);
  } catch (err) {
    console.error(err);
    const response = {
      error: {
        type: 'internal_error',
        message: 'internal server error',
      },
    };
    return res.status(500).send(response);
  }
  if (manufacturer === undefined) {
    const response = {
      error: {
        type: 'fetch_error',
        message: 'manufacturer not found.',
      },
    };
    return res.status(400).send(response);
  }

  let brewer = new Brewer();
  brewer.name = payload.name;
  brewer.manufacturer = manufacturer;
  brewer.createdBy = user;
  try {
    brewer = await brewer.save();
  } catch (err) {
    console.error(err);
    const response = {
      error: {
        type: 'insert_error',
        message: 'unable to insert entity',
      },
    };
    return res.status(500).send(response);
  }

  const response = {
    brewer: brewer,
  };
  return res.status(200).send(response);
});

// equipment manufacturer apis
router.get('/brewer/manufacturer', AuthGuard, async (_req, res) => {
  let manufacturers: Manufacturer[] = [];
  try {
    manufacturers = await Manufacturer.find({});
  } catch (err) {
    console.error(err);
    const response = {
      error: {
        type: 'internal_error',
        message: 'internal server error',
      },
    };
    return res.status(500).send(response);
  }

  const response = {
    manufacturers: manufacturers,
  };
  return res.send(response);
});

router.post('/brewer/manufacturer', AuthGuard, async (req, res) => {
  const payload: CreateManufacturerApiRequest = req.body;
  let manufacturer = new Manufacturer();
  manufacturer.name = payload.name;
  manufacturer.country = payload.country;
  try {
    manufacturer = await manufacturer.save();
  } catch (err) {
    const response = {
      error: {
        type: 'insert_error',
        message: 'an error occured during insert',
      },
    };
    return res.status(500).send(response);
  }

  const response = {
    manufacturer: {
      ...manufacturer,
      brewers: undefined,
    },
  };
  return res.status(200).send(response);
});

const brewController = router;

export default brewController;

// const uid = res.locals.user.userId;
//   let user: User | undefined = undefined;
//   try {
//     user = await authService.findUserById(uid);
//   } catch (err) {
//     const response = {
//       error: {
//         type: 'internal_error',
//         message: 'internal server error',
//       },
//     };
//     return res.status(500).send(response);
//   }

//   if (!user) {
//     const response = {
//       error: {
//         type: 'fetch_error',
//         message: 'user not found',
//       },
//     };
//     return res.status(400).send(response);
//   }
