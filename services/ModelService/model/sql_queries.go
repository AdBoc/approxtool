package model

const (
	getAllModelsQuery    = `SELECT id, name, expression, lex_expression, tag FROM models WHERE user_id=$1;`
	insertNewModelQuery  = `INSERT INTO models (id, name, expression, lex_expression, tag, user_id) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING id, name, expression, lex_expression, tag;`
	deleteModelByIdQuery = `DELETE FROM models WHERE id=$1;`
	updateTag 			 = `UPDATE models SET tag=$1 WHERE id=$2;`
)

type model struct {
	name          string
	expression    string
	lexExpression string
	tag 		  string
}

var models = []model{
	model{name: "linear_fit", expression: "a*x+b", lexExpression: "a \\cdot x+b", tag: "Linear"},
	model{name: "polynomial n2", expression: "a*x**2+b*x+c", lexExpression: "a \\cdot x^{2}+b \\cdot x+c", tag: "Polynomial"},
	model{name: "polynomial n3", expression: "a*x**3+b*x**2+c*x+d", lexExpression: "a \\cdot x^{3}+b \\cdot x^{2}+c \\cdot x+d", tag: "Polynomial"},
	model{name: "polynomial n4", expression: "a*x**4+b*x**3+c*x**2+d*x+e", lexExpression: "a \\cdot x^{4}+b \\cdot x^{3}+c \\cdot x^{2}+d \\cdot x+e", tag: "Polynomial"},
	model{name: "polynomial n5", expression: "a*x**5+b*x**4+c*x**3+d*x**2+e*x+f", lexExpression: "a \\cdot x^{5}+b \\cdot x^{4}+c \\cdot x^{3}+d \\cdot x^{2}+e \\cdot x+f", tag: "Polynomial"},
	model{name: "polynomial n6", expression: "a*x**6+b*x**5+c*x**4+d*x**3+e*x**2+f*x+g", lexExpression: "a \\cdot x^{6}+b \\cdot x^{5}+c \\cdot x^{4}+d \\cdot x^{3}+e \\cdot x^{2}+f \\cdot x+g", tag: "Polynomial"},
	model{name: "polynomial n7", expression: "a*x**7+b*x**6+c*x**5+d*x**4+e*x**3+f*x**2+g*x+h", lexExpression: "a \\cdot x^{7}+b \\cdot x^{6}+c \\cdot x^{5}+d \\cdot x^{4}+e \\cdot x^{3}+f \\cdot x^{2}+g \\cdot x+h", tag: "Polynomial"},
	model{name: "polynomial n8", expression: "a*x**8+b*x**7+c*x**6+d*x**5+e*x**4+f*x**3+g*x**2+h*x+i", lexExpression: "a \\cdot x^{8}+b \\cdot x^{7}+c \\cdot x^{6}+d \\cdot x^{5}+e \\cdot x^{4}+f \\cdot x^{3}+g \\cdot x^{2}+h \\cdot x+i", tag: "Polynomial"},
	model{name: "DR-LogLogitic", expression: "a+(1-a)/(1+exp(-(b+c*ln(x))))", lexExpression: "\\frac{-a+1}{e^{-c \\cdot \\ln \\cdot x-b}+1}+a", tag: "Dose-Response"},
	model{name: "Rational Model", expression: "(a+b*x)/(1+c*x+d*x**2)", lexExpression: "\\frac{b \\cdot x+a}{c \\cdot x+d \\cdot x^{2}+1}", tag: "Miscellaneous"},
	model{name: "DR-Multistage-3", expression: "a+(1-a)*(1-exp(-b*x-c*x**2-d*x**3))", lexExpression: "\\left(-a+1\\right) \\cdot \\left(-e^{-b \\cdot x-c \\cdot x^{2}-d \\cdot x^{3}}+1\\right)+a", tag: "Dose-Response"},
	model{name: "truncated fourier", expression: "a*cos(x+d)+b*cos(2*x+d)+c*cos(3*x+d)", lexExpression: "\\mathrm{cos}\\left(d+x\\right) \\cdot a+\\mathrm{cos}\\left(2 \\cdot x+d\\right) \\cdot b+\\mathrm{cos}\\left(3 \\cdot x+d\\right) \\cdot c", tag: "Miscellaneous"},
	model{name: "reciprocal quadratic", expression: "1/(a+b*x+c*x**2)", lexExpression: "\\frac{1}{\\left(b \\cdot x+c \\cdot x^{2}+a\\right)}", tag: "Yield-Spacing"},
	model{name: "wavy:", expression: "a*cos(2*x)+b*sin(x)", lexExpression: "\\mathrm{cos}\\left(2 \\cdot x\\right) \\cdot a+\\mathrm{sin}\\left(x\\right) \\cdot b", tag: "Unassigned"},
	model{name: "richards:", expression: "a/(1+exp(b-c*x))**(1/d)", lexExpression: "\\frac{a}{\\left(e^{-c \\cdot x+b}+1\\right)^{\\frac{1}{d}}}", tag: "Sigmoidal"},
	model{name: "logistic:", expression: "a/(1+b*e**(-c*x))", lexExpression: "\\frac{a}{\\frac{b}{e^{c \\cdot x}}+1}", tag: "Sigmoidal"},
}
