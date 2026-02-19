const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); 
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const ADMIN_USER = {
    username: process.env.ADMIN_USERNAME,
    passwordHash: process.env.ADMIN_PASSWORD_HASH 
};

const skrivnost = process.env.JWT_SECRET;

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('NAPAKA: Povezava z bazo ni uspela!', err.message);
    } else {
        console.log('USPEH: Povezan z MySQL bazo.');
        connection.release();
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) return res.status(401).json({ message: "Dostop zavrnjen. Manjka token." });

    jwt.verify(token, skrivnost, (err, user) => {
        if (err) return res.status(403).json({ message: "Neveljaven token." });
        req.user = user;
        next();
    });
};

// LOGIN 
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username !== ADMIN_USER.username) {
        return res.status(401).json({ success: false, message: 'Napačni prijavni podatki.' });
    }

    if (!ADMIN_USER.passwordHash) {
        console.error("NAPAKA: Hash manjka v .env datoteki!");
        return res.status(500).json({ success: false, message: 'Napaka na strežniku.' });
    }

    const isMatch = bcrypt.compareSync(password, ADMIN_USER.passwordHash);

    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Napačni prijavni podatki.' });
    }

    const token = jwt.sign(
        { username: ADMIN_USER.username, role: 'admin' }, 
        skrivnost, 
        { expiresIn: '1h' }
    );

    res.json({ success: true, token: token });
});

// NOVA REZERVACIJA
app.post('/api/rezervacija', (req, res) => {
    const { service, expert, date, time, name, phone } = req.body;
    
    console.log(`Nova rezervacija prejeta: ${name} za ${service}`);

    const sql = `INSERT INTO Bookings (service, expert, date, time, name, phone) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [service, expert, date, time, name, phone], (err, result) => {
        if (err) {
            console.error("Napaka pri SQL vnosu:", err);
            res.status(500).send('Napaka pri shranjevanju v bazo.');
        } else {
            res.status(200).send('Rezervacija uspešna!');
        }
    });
});

// PREVERJANJE ZASEDENOSTI (NOVO)
app.get('/api/zasedenost', (req, res) => {
    const { date, expert } = req.query;
    
    if (!date || !expert) {
        return res.status(400).json({ error: "Manjka datum ali strokovnjak." });
    }

    const sql = "SELECT time, service FROM Bookings WHERE date = ? AND expert = ?";
    
    db.query(sql, [date, expert], (err, data) => {
        if (err) {
            console.error("Napaka pri branju zasedenosti:", err);
            return res.status(500).json({ error: "Napaka baze." });
        }
        res.json(data); 
    });
});

// BRANJE VSEH
app.get('/api/rezervacija', authenticateToken, (req, res) => {
    const sql = "SELECT * FROM Bookings ORDER BY id DESC";
    
    db.query(sql, (err, data) => {
        if(err) {
            console.error("Napaka pri branju baze:", err);
            return res.status(500).json("Napaka pri branju");
        }
        return res.json(data);
    });
});

// UREJANJE
app.put('/api/rezervacija/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const { service, expert, date, time, name, phone } = req.body;

    const sql = "UPDATE Bookings SET service=?, expert=?, date=?, time=?, name=?, phone=? WHERE id=?";
    
    db.query(sql, [service, expert, date, time, name, phone, id], (err, result) => {
        if (err) {
            console.error("Napaka pri update:", err);
            return res.status(500).send("Napaka pri posodabljanju");
        }
        res.send("Uspešno posodobljeno");
    });
});

// BRISANJE
app.delete('/api/rezervacija/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    
    const sql = "DELETE FROM Bookings WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Napaka pri delete:", err);
            return res.status(500).send("Napaka pri brisanju");
        }
        res.send("Uspešno izbrisano");
    });
});

// BLOG API
app.get('/api/blog', (req, res) => {
    db.query("SELECT * FROM BlogPosts ORDER BY created_at DESC", (err, data) => {
        if(err) {
            console.error(err);
            return res.status(500).json("Napaka pri branju bloga");
        }
        res.json(data);
    });
});

app.get('/api/blog/:id', (req, res) => {
    db.query("SELECT * FROM BlogPosts WHERE id = ?", [req.params.id], (err, data) => {
        if(err) return res.status(500).json("Napaka DB");
        if(data.length === 0) return res.status(404).json("Članek ni najden");
        res.json(data[0]);
    });
});

app.post('/api/blog', authenticateToken, (req, res) => {
    const { date, category, image, title_sl, excerpt_sl, content_sl, title_it, excerpt_it, content_it } = req.body;
    
    const sql = `INSERT INTO BlogPosts 
    (date, category, image, title_sl, excerpt_sl, content_sl, title_it, excerpt_it, content_it) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [date, category, image, title_sl, excerpt_sl, content_sl, title_it, excerpt_it, content_it], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).send("Napaka pri shranjevanju");
        }
        res.send("Članek dodan");
    });
});

app.put('/api/blog/:id', authenticateToken, (req, res) => {
    const { date, category, image, title_sl, excerpt_sl, content_sl, title_it, excerpt_it, content_it } = req.body;
    
    const sql = `UPDATE BlogPosts SET 
    date=?, category=?, image=?, 
    title_sl=?, excerpt_sl=?, content_sl=?, 
    title_it=?, excerpt_it=?, content_it=? 
    WHERE id=?`;

    db.query(sql, [date, category, image, title_sl, excerpt_sl, content_sl, title_it, excerpt_it, content_it, req.params.id], (err) => {
        if(err) return res.status(500).send("Napaka update");
        res.send("Članek posodobljen");
    });
});

app.delete('/api/blog/:id', authenticateToken, (req, res) => {
    db.query("DELETE FROM BlogPosts WHERE id = ?", [req.params.id], (err) => {
        if(err) return res.status(500).send("Napaka delete");
        res.send("Članek izbrisan");
    });
});

app.listen(PORT, () => {
    console.log(`Backend strežnik teče na http://localhost:${PORT}`);
});