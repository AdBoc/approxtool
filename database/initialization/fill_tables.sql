\c approx_tool

INSERT INTO users VALUES (DEFAULT, 'admin@mail.com', '$2a$10$MNvDujHFuZMhCQZfYEEYz.mZniHza9XLBf6qNozB1JrMzf6xMmg4u', 'admin', 'ADMIN', DEFAULT);

INSERT INTO models VALUES (DEFAULT, 'linear_fit', 'a*x+b', 'a \cdot x+b', 1);
INSERT INTO models VALUES (DEFAULT, 'plynomial 2', 'a*x**2+b*x+c', 'a \cdot x^{2}+b \cdot x+c', 1);
INSERT INTO models VALUES (DEFAULT, 'plynomial 3', 'a*x**3+b*x**2+c*x+d', 'a \cdot x^{3}+b \cdot x^{2}+c \cdot x+d', 1);
INSERT INTO models VALUES (DEFAULT, 'plynomial 4', 'a*x**4+b*x**3+c*x**2+d*x+e', 'a \cdot x^{4}+b \cdot x^{3}+c \cdot x^{2}+d \cdot x+e', 1);
INSERT INTO models VALUES (DEFAULT, 'plynomial 5', 'a*x**5+b*x**4+c*x**3+d*x**2+e*x+f', 'a \cdot x^{5}+b \cdot x^{4}+c \cdot x^{3}+d \cdot x^{2}+e \cdot x+f', 1);
INSERT INTO models VALUES (DEFAULT, 'plynomial 6', 'a*x**6+b*x**5+c*x**4+d*x**3+e*x**2+f*x+g', 'a \cdot x^{6}+b \cdot x^{5}+c \cdot x^{4}+d \cdot x^{3}+e \cdot x^{2}+f \cdot x+g', 1);
INSERT INTO models VALUES (DEFAULT, 'plynomial 7', 'a*x**7+b*x**6+c*x**5+d*x**4+e*x**3+f*x**2+g*x+h', 'a \cdot x^{7}+b \cdot x^{6}+c \cdot x^{5}+d \cdot x^{4}+e \cdot x^{3}+f \cdot x^{2}+g \cdot x+h', 1);
INSERT INTO models VALUES (DEFAULT, 'plynomial 8', 'a*x**8+b*x**7+c*x**6+d*x**5+e*x**4+f*x**3+g*x**2+h*x+i', 'a \cdot x^{8}+b \cdot x^{7}+c \cdot x^{6}+d \cdot x^{5}+e \cdot x^{4}+f \cdot x^{3}+g \cdot x^{2}+h \cdot x+i', 1);
INSERT INTO models VALUES (DEFAULT, 'DR-LogLogitic', 'a+(1-a)/(1+exp(-(b+c*ln(x))))', '\frac{-a+1}{e^{-c \cdot \ln \cdot x-b}+1}+a', 1);
INSERT INTO models VALUES (DEFAULT, 'Rational Model', '(a+b*x)/(1+c*x+d*x**2)', '\frac{b \cdot x+a}{c \cdot x+d \cdot x^{2}+1}', 1);
INSERT INTO models VALUES (DEFAULT, 'DR-Multistage-3', 'a+(1-a)*(1-exp(-b*x-c*x**2-d*x**3))', '\left(-a+1\right) \cdot \left(-e^{-b \cdot x-c \cdot x^{2}-d \cdot x^{3}}+1\right)+a', 1);
INSERT INTO models VALUES (DEFAULT, 'truncated fourier', 'a*cos(x+d)+b*cos(2*x+d)+c*cos(3*x+d)', '\mathrm{cos}\left(d+x\right) \cdot a+\mathrm{cos}\left(2 \cdot x+d\right) \cdot b+\mathrm{cos}\left(3 \cdot x+d\right) \cdot c', 1);
INSERT INTO models VALUES (DEFAULT, 'reciprocal quadratic', '1/(a+b*x+c*x**2)', '\frac{1}{\left(b \cdot x+c \cdot x^{2}+a\right)}', 1);
INSERT INTO models VALUES (DEFAULT, 'wavy', 'a*cos(2*x)+b*sin(x)', '\mathrm{cos}\left(2 \cdot x\right) \cdot a+\mathrm{sin}\left(x\right) \cdot b', 1);
INSERT INTO models VALUES (DEFAULT, 'richards', 'a/(1+exp(b-c*x))**(1/d)', '\frac{a}{\left(e^{-c \cdot x+b}+1\right)^{\frac{1}{d}}}', 1);
INSERT INTO models VALUES (DEFAULT, 'logistic', 'a/(1+b*e**(-c*x))', '\frac{a}{\frac{b}{e^{c \cdot x}}+1}', 1);

-- INSERT INTO models VALUES (DEFAULT, 'exponential decline', 'q*exp(-x/a)', '\frac{q}{e^{\frac{x}{a}}}', 1); --q0*exp(-x/a)
-- INSERT INTO models VALUES (DEFAULT, 'modified exponential', 'a*exp(b/x)', 'e^{\frac{b}{x}} \cdot a', 1);
-- INSERT INTO models VALUES (DEFAULT, 'exponential association 2', 'a*(1-exp(-b*x))', 'a \cdot \left(-\frac{1}{e^{b \cdot x}}+1\right)', 1);
-- INSERT INTO models VALUES (DEFAULT, 'gaussian model', 'a*exp(-(x-b)**2/(2*c**2))', '\frac{a}{e^{\frac{\left(-b+x\right)^{2}}{2 \cdot c^{2}}}}', 1);
-- INSERT INTO models VALUES (DEFAULT, 'root', 'a*b**(1/x)', 'b^{\frac{1}{x}} \cdot a', 1);
-- INSERT INTO models VALUES (DEFAULT, 'exponential plus linear', 'a+b*r**x+c*x', 'r^{x} \cdot b+c \cdot x+a', 1);
-- INSERT INTO models VALUES (DEFAULT, 'log normal pdf', 'exp(-0.5*((ln(x)-a)**2/b)/x*b*sqrt(2.0*pi))', '', 1); --exp(-0.5*((ln(x)-mu)**2/sigma)/x*sigma*sqrt(2.0*pi)

INSERT INTO users VALUES (DEFAULT, 'test@user.test', '$2a$10$MNvDujHFuZMhCQZfYEEYz.mZniHza9XLBf6qNozB1JrMzf6xMmg4u', 'user', 'USER', DEFAULT);

INSERT INTO models VALUES (DEFAULT, 'linear_fit', 'a*x+b', 'a \cdot x+b', 2);
INSERT INTO models VALUES (DEFAULT, 'plynomial 2', 'a*x**2+b*x+c', 'a \cdot x^{2}+b \cdot x+c', 2);
INSERT INTO models VALUES (DEFAULT, 'plynomial 3', 'a*x**3+b*x**2+c*x+d', 'a \cdot x^{3}+b \cdot x^{2}+c \cdot x+d', 2);
INSERT INTO models VALUES (DEFAULT, 'plynomial 4', 'a*x**4+b*x**3+c*x**2+d*x+e', 'a \cdot x^{4}+b \cdot x^{3}+c \cdot x^{2}+d \cdot x+e', 2);
INSERT INTO models VALUES (DEFAULT, 'plynomial 5', 'a*x**5+b*x**4+c*x**3+d*x**2+e*x+f', 'a \cdot x^{5}+b \cdot x^{4}+c \cdot x^{3}+d \cdot x^{2}+e \cdot x+f', 2);
INSERT INTO models VALUES (DEFAULT, 'plynomial 6', 'a*x**6+b*x**5+c*x**4+d*x**3+e*x**2+f*x+g', 'a \cdot x^{6}+b \cdot x^{5}+c \cdot x^{4}+d \cdot x^{3}+e \cdot x^{2}+f \cdot x+g', 2);
INSERT INTO models VALUES (DEFAULT, 'plynomial 7', 'a*x**7+b*x**6+c*x**5+d*x**4+e*x**3+f*x**2+g*x+h', 'a \cdot x^{7}+b \cdot x^{6}+c \cdot x^{5}+d \cdot x^{4}+e \cdot x^{3}+f \cdot x^{2}+g \cdot x+h', 2);
INSERT INTO models VALUES (DEFAULT, 'plynomial 8', 'a*x**8+b*x**7+c*x**6+d*x**5+e*x**4+f*x**3+g*x**2+h*x+i', 'a \cdot x^{8}+b \cdot x^{7}+c \cdot x^{6}+d \cdot x^{5}+e \cdot x^{4}+f \cdot x^{3}+g \cdot x^{2}+h \cdot x+i', 2);
INSERT INTO models VALUES (DEFAULT, 'DR-LogLogitic', 'a+(1-a)/(1+exp(-(b+c*ln(x))))', '\frac{-a+1}{e^{-c \cdot \ln \cdot x-b}+1}+a', 2);
INSERT INTO models VALUES (DEFAULT, 'Rational Model', '(a+b*x)/(1+c*x+d*x**2)', '\frac{b \cdot x+a}{c \cdot x+d \cdot x^{2}+1}', 2);
INSERT INTO models VALUES (DEFAULT, 'DR-Multistage-3', 'a+(1-a)*(1-exp(-b*x-c*x**2-d*x**3))', '\left(-a+1\right) \cdot \left(-e^{-b \cdot x-c \cdot x^{2}-d \cdot x^{3}}+1\right)+a', 2);
INSERT INTO models VALUES (DEFAULT, 'truncated fourier', 'a*cos(x+d)+b*cos(2*x+d)+c*cos(3*x+d)', '\mathrm{cos}\left(d+x\right) \cdot a+\mathrm{cos}\left(2 \cdot x+d\right) \cdot b+\mathrm{cos}\left(3 \cdot x+d\right) \cdot c', 2);
INSERT INTO models VALUES (DEFAULT, 'reciprocal quadratic', '1/(a+b*x+c*x**2)', '\frac{1}{\left(b \cdot x+c \cdot x^{2}+a\right)}', 2);
INSERT INTO models VALUES (DEFAULT, 'wavy', 'a*cos(2*x)+b*sin(x)', '\mathrm{cos}\left(2 \cdot x\right) \cdot a+\mathrm{sin}\left(x\right) \cdot b', 2);
INSERT INTO models VALUES (DEFAULT, 'richards', 'a/(1+exp(b-c*x))**(1/d)', '\frac{a}{\left(e^{-c \cdot x+b}+1\right)^{\frac{1}{d}}}', 2);
INSERT INTO models VALUES (DEFAULT, 'logistic', 'a/(1+b*e**(-c*x))', '\frac{a}{\frac{b}{e^{c \cdot x}}+1}', 2);
