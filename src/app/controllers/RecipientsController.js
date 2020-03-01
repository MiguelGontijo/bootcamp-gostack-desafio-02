import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const { name } = req.body;

    const recipient = await Recipients.findOne({ where: { name } });

    if (recipient) {
      return res.status(401).json({ error: 'Recipients already exists!' });
    }

    const recipients = await Recipients.create(req.body);

    return res.json(recipients);
  }

  async update(req, res) {
    const recipients = req.body;

    if (!recipients.id) {
      return res.status(401).json({ error: 'Id is required!' });
    }

    const recipient = await Recipients.findByPk(recipients.id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exists!' });
    }

    const altRecipients = await recipient.update(recipients);

    return res.json(altRecipients);
  }
}

export default new RecipientsController();
