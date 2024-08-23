import { query } from '../utils/utils.js';

export class ReviewController {
  static async create (req, res) {
    try {
      const { email, comment, name, hostId } = req.body;
      await query('INSERT INTO reviews SET email = ?, comment = ?, name = ?, id_visiting = ?, created_at = CONVERT_TZ(CURRENT_TIMESTAMP(), \'+00:00\', \'America/Bogota\')', [
        email,
        comment,
        name,
        hostId
      ]);
      return res.json({ success: true });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ success: false, error: { existsEmail: true } });
      }

      return res.status(400).json({ success: false, error: e });
    }
  }

  static async getAll (req, res) {
    try {
      const reviews = await query('SELECT * FROM reviews WHERE deleted IS NULL ORDER BY created_at DESC');

      return res.json({ success: true, data: reviews });
    } catch (e) {
      return res.status(400).json({ success: false, error: e });
    }
  }

  static async getInfoHost (req, res) {
    try {
      const { hostId } = req.params;
      const reviews = await query('SELECT email, name FROM reviews WHERE id_visiting = ? AND deleted IS NULL ORDER BY id DESC LIMIT 1', [hostId]);
      return res.json({ success: true, data: reviews });
    } catch (e) {
      return res.status(400).json({ success: false, error: e });
    }
  }

  static async update (req, res) {
    try {
      const { id, comment } = req.body;
      await query('UPDATE reviews SET comment = ? WHERE id = ?', [
        comment,
        id
      ]);
      return res.json({ success: true });
    } catch (e) {
      return res.status(400).json({ success: false, error: e });
    }
  }

  static async delete (req, res) {
    try {
      const { id } = req.params;
      await query('UPDATE reviews SET deleted = 1 WHERE id = ?', [id]);
      return res.json({ success: true });
    } catch (e) {
      return res.status(400).json({ success: false, error: e });
    }
  }
}

// CREATE TABLE reviews (
//    id INT PRIMARY KEY AUTO_INCREMENT,
//    id_visiting VARCHAR(255) NOT NULL,
//    email varchar(255) UNIQUE,
//    name varchar(255) NOT NULL,
//    comment text NOT NULL,
//    deleted boolean,
//    created_at timestamp default current_timestamp
// )
