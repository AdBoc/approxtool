\c approx_tool

INSERT INTO users VALUES (DEFAULT, 'admin@mail.com', 'admin', 'adminPass', 'admin', DEFAULT);
INSERT INTO users VALUES (DEFAULT, 'user@mail.com', 'user', 'userPass', 'user', DEFAULT);

INSERT INTO models VALUES (DEFAULT, 'linear_fit', 'a*x+b', 'a \cdot x+b', 1);
INSERT INTO models VALUES (DEFAULT, 'plynomial 2', 'a*x**2+b*x+c', 'a \cdot x^{2}+b \cdot x+c', 1);
INSERT INTO models VALUES (DEFAULT, 'plynomial 3', 'a*x**3+b*x**2+c*x+d', 'a \cdot x^{3}+b \cdot x^{2}+c \cdot x+d', 1);
INSERT INTO models VALUES (DEFAULT, 'plynomial 8', 'a*x**8+b*x**7+c*x**6+d*x**5+e*x**4+f*x**3+g*x**2+h*x+i', 'a \cdot x^{8}+b \cdot x^{7}+c \cdot x^{6}+d \cdot x^{5}+e \cdot x^{4}+f \cdot x^{3}+g \cdot x^{2}+h \cdot x+i', 1);
INSERT INTO models VALUES (DEFAULT, 'exponential decline', 'q*exp(-x/a)', '\frac{q}{e^{\frac{x}{a}}}', 1); --q0*exp(-x/a)
INSERT INTO models VALUES (DEFAULT, 'DR-LogLogitic', 'a+(1-a)/(1+exp(-(b+c*ln(x))))', '\frac{-a+1}{e^{-c \cdot \ln \cdot x-b}+1}+a', 1); --gamma + (1-gamma)/(1+exp(-(alpha+beta*ln(x))))
INSERT INTO models VALUES (DEFAULT, 'modified exponential', 'a*exp(b/x)', 'e^{\frac{b}{x}} \cdot a', 1);
INSERT INTO models VALUES (DEFAULT, 'exponential association 2', 'a*(1-exp(-b*x))', 'a \cdot \left(-\frac{1}{e^{b \cdot x}}+1\right)', 1);
INSERT INTO models VALUES (DEFAULT, 'gaussian model', 'a*exp(-(x-b)**2/(2*c**2))', '\frac{a}{e^{\frac{\left(-b+x\right)^{2}}{2 \cdot c^{2}}}}', 1);
INSERT INTO models VALUES (DEFAULT, 'root', 'a*b**(1/x)', 'b^{\frac{1}{x}} \cdot a', 1);
INSERT INTO models VALUES (DEFAULT, 'richards', 'a/(1+exp(b-c*x))**(1/d)', '\frac{a}{\left(e^{-c \cdot x+b}+1\right)^{\frac{1}{d}}}', 1);
INSERT INTO models VALUES (DEFAULT, 'exponential plus linear', 'a+b*r**x+c*x', 'r^{x} \cdot b+c \cdot x+a', 1);
INSERT INTO models VALUES (DEFAULT, 'reciprocal quadratic', '1/(a+b*x+c*x**2)', '\frac{1}{\left(b \cdot x+c \cdot x^{2}+a\right)}', 1);
-- INSERT INTO models VALUES (DEFAULT, 'log normal pdf', 'exp(-0.5*((ln(x)-a)**2/b)/x*b*sqrt(2.0*pi))', '', 1); --exp(-0.5*((ln(x)-mu)**2/sigma)/x*sigma*sqrt(2.0*pi)