import Organisation from '../../models/organisation/organisation';
import User from '../../models/user/user';

export const createOrganisation = async (args) => {
  const organisation = await Organisation.findById(args._id);
  if (organisation !== null) {
    return organisation;
  }

  args.owner = await User.findById(args.ownerId);
  return Organisation
    .create(args)
    .save();
};

export const updateOrganisation = async args => args;

export const deleteOrganisation = async _id => Organisation.deleteOne({ _id });
