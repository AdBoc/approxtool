\c user_service

INSERT INTO users VALUES (DEFAULT, 'sampleUser', 'samplePassword', 'sample@emial.com');
INSERT INTO users VALUES (DEFAULT, 'sampleUser2', 'samplePassword2', 'sample2@emial.com');

\c model_service

INSERT INTO models VALUES (DEFAULT, 'linear_fit', 'a*x+b', 'a \cdot x+b');
INSERT INTO models VALUES (DEFAULT, 'plynomial', 'a*x**2+b*x+c', 'a \cdot x^{2}+b \cdot x+c');
INSERT INTO models VALUES (DEFAULT, 'plynomial', 'a*x**4+b*x**3+c*x**2+d*x+e', 'a \cdot x^{4}+b \cdot x^{3}+c \cdot x^{2}+d \cdot x+e');
INSERT INTO models VALUES (DEFAULT, 'plynomial', 'd+((a-d)/(1+(x/c)**b))', '\frac{-d+a}{\frac{x^{b}}{c}+1}+d');
INSERT INTO models VALUES (DEFAULT, 'plynomial', 'a+b/2**(x/c)', '\frac{b}{2^{\frac{x}{c}}}+a');
