function draw_graphique_6(data) {
					//Largeur et hauteur du graphe
					var larg_tot =750;
					var larg =450;
					var haut =400;
					var haut_txt =95;
					var bord = 22;
						
					var svg_conteneur = d3.select("div.graphe_de_simon")
						
					var svg_txt = d3.select("div.graphe_de_simon")
						.append("svg")
						.attr("width", larg_tot)
						.attr("height", haut_txt);
						
						
					//Creation de l'élément SVG
					var svg = d3.select("div.graphe_de_simon")
						.append("svg")
						.attr("width", larg_tot)
						.attr("height", haut);
						
					// function
					function f_ann(d){return d.ann;}
					function f_sco(d){return -d.sco;}
					function f_imm(d){return -d.imm;}
					function f_del(d){return -d.del;}
					function f_chm(d){return -d.chm;}
					function f_del_ok(d){
						return d.del!==-1;
						}
					
					// scale
					var sc_ann = d3.scale.linear()
						.domain([
							d3.min(data, f_ann), 
							d3.max(data, f_ann)])
						.range([bord,larg-bord]);
					var sc_sco = d3.scale.linear()
						.domain([
							d3.min(data, f_sco), 
							0])
						.range([bord,haut-bord]);
					var sc_imm = d3.scale.linear()
						.domain([
							-7, 
							0])
						.range([bord,haut-bord]);
					var sc_del = d3.scale.linear()
						.domain([
							d3.min(data, f_del), 
							d3.max(data, f_del)])
						.range([bord,haut-bord]);
					var sc_chm = d3.scale.linear()
						.domain([
							d3.min(data, f_chm), 
							d3.max(data, f_chm)])
						.range([bord,haut-bord]);
						
					// function scalee
					function fs_ann(d){return sc_ann(d.ann);}
					//function fs_ann_n(d){return sc_ann(d.ann+10);}
					function fs_sco(d){return sc_sco(-d.sco);}
					function fs_chm(d){return sc_chm(-d.chm);}
					function fs_chm2(d){return sc_sco(-d.chm2);}
					function fs_imm(d){return sc_imm(-d.imm);}
					function fs_imm2(d){return sc_sco(-d.imm2);}
					function fs_del(d){return sc_del(-d.del);}
					function fs_del2(d){return sc_sco(-d.del2);}
					
					// les axes
					var xAxis = d3.svg.axis()
						.scale(sc_ann)
						.ticks(5)
						.orient("bottom");
						
					svg.append("g")
						.attr("class", "axis")//Assigne la classe CSS "axis"
						.attr("transform", "translate(0,"+(haut - bord)+")")
						.call(xAxis);
						
					var yAxis = d3.svg.axis()
						.scale(sc_sco)
						.ticks(5)
						.orient("left");
						
					svg.append("g")
						.attr("class", "axis")//Assigne la classe CSS "axis"
						.attr("transform", "translate("+bord+",0)");
						//.call(yAxis);
					
					var legend_larg = (larg_tot-larg)*0.9;
					var legend_haut = haut*0.6;
					var legend_origine_x = larg+(larg_tot-larg)*0.05;
					var legend_origine_y = haut*0.2;
					var graph_larg = larg-2*bord;
					var graph_haut = haut-2*bord;
					var graph_origine_x = bord;
					var graph_origine_y = bord;
					
					var color_rect = "#DDDDDD";
					
					var graph = svg.append("rect")
						.attr("width", graph_larg)
						.attr("height", graph_haut)                                    
						.attr("x", graph_origine_x) 
						.attr("y", graph_origine_y)
						.attr("fill","none")
						.attr("stroke", color_rect)
						.attr("class", "graph_rect")
						.attr("stroke-width","2");
						
					var legend = svg.append("rect")
						.attr("width", legend_larg)
						.attr("height", legend_haut)                                    
						.attr("x", legend_origine_x) 
						.attr("y", legend_origine_y)
						.attr("fill","white")
						.attr("stroke", color_rect)
						.attr("class", "legend_rect")
						.attr("stroke-width","2");
					
					var color_sco = "#3399FF"
					var color_imm = "#66AA33"
					var color_del = "#FF9933"
					var color_chm = "#FF3333"
					var color_restart = "#AAAAAA"
					var color_box_empty = "#EEEEEE"
					
					var aff_sco = false
					var aff_imm = false
					var aff_del = false
					var aff_chm = false
					
					// score du FN
					var groupe_sco = svg.append("g");
					var line_sco_trace = d3.svg.line()
						.x (fs_ann)
						.y (fs_sco)
						.interpolate("monotone");
					var line_sco = groupe_sco.selectAll("path")
						.data([data])
						.enter()
						.append("path")
						.attr("d",line_sco_trace)
						.attr("fill", "none")
						.attr("stroke", color_sco)
						.attr("stroke-width","1");
					var len_sco = line_sco.node().getTotalLength();
					line_sco
						.attr("stroke-dasharray", len_sco + " " + len_sco)
						.attr("stroke-dashoffset", -len_sco);
					// IMMIGRATION
					var groupe_imm = svg.append("g");
					var line_imm_trace = d3.svg.line()
						.x (fs_ann)
						.y (fs_imm)
						.interpolate("monotone");
					var line_imm = groupe_imm.selectAll("path")
						.data([data])
						.enter()
						.append("path")
						.attr("d",line_imm_trace)
						.attr("fill", "none")
						.attr("stroke", color_imm)
						.attr("stroke-width","1");
					var len_imm = line_imm.node().getTotalLength();
					line_imm
						.attr("stroke-dasharray", len_imm + " " + len_imm)
						.attr("stroke-dashoffset", -len_imm);
					// DELINQUANCE
					var groupe_del = svg.append("g");
					var line_del_trace = d3.svg.line()
						.x (fs_ann)
						.y (fs_del)
						.interpolate("monotone")
						.defined(function(d) { return d.del >= 0; });
					var line_del = groupe_del.selectAll("path")
						.data([data])
						.enter()
						.append("path")
						.attr("d",line_del_trace)
						.attr("fill", "none")
						.attr("stroke", color_del)
						.attr("stroke-width","1");
					var len_del = line_del.node().getTotalLength();
					line_del
						.attr("stroke-dasharray", len_del + " " + len_del)
						.attr("stroke-dashoffset", -len_del);
					// CHOMAGE
					var groupe_chm = svg.append("g");
					var line_chm_trace = d3.svg.line()
						.x (fs_ann)
						.y (fs_chm)
						.interpolate("monotone");
					var line_chm = groupe_chm.selectAll("path")
						.data([data])
						.enter()
						.append("path")
						.attr("d",line_chm_trace)
						.attr("fill", "none")
						.attr("stroke", color_chm)
						.attr("stroke-width","1");
					var len_chm = line_chm.node().getTotalLength();
					line_chm
						.attr("stroke-dasharray", len_chm + " " + len_chm)
						.attr("stroke-dashoffset", -len_chm);
					
					function aff_sco_fct(){
						aff_sco = ! aff_sco;
						box_sco.attr("fill",aff_color(aff_sco,color_sco));
						if( aff_sco){
							line_sco
							  .attr("stroke-dashoffset", len_sco)
							  .transition()
								.duration(1000)
								.ease("linear")
								.attr("stroke-dashoffset", 0);
						}
						else {
							line_sco
							  .attr("stroke-dashoffset", 0)
							  .transition()
								.duration(1000)
								.ease("linear")
								.attr("stroke-dashoffset", -len_sco);
						}
					}
					function aff_imm_fct(){
						aff_imm = ! aff_imm;
						box_imm.attr("fill",aff_color(aff_imm,color_imm));
						if( aff_imm){
							line_imm
							  .attr("stroke-dashoffset", len_imm)
							  .transition()
								.duration(1000)
								.ease("linear")
								.attr("stroke-dashoffset", 0);
						}
						else {
							line_imm
							  .attr("stroke-dashoffset", 0)
							  .transition()
								.duration(1000)
								.ease("linear")
								.attr("stroke-dashoffset", -len_imm);
						}
					}
					function aff_del_fct(){
						aff_del = ! aff_del;
						box_del.attr("fill",aff_color(aff_del,color_del));
						if( aff_del){
							line_del
							  .attr("stroke-dashoffset", len_del)
							  .transition()
								.duration(1000)
								.ease("linear")
								.attr("stroke-dashoffset", 0);
						}
						else {
							line_del
							  .attr("stroke-dashoffset", 0)
							  .transition()
								.duration(1000)
								.ease("linear")
								.attr("stroke-dashoffset", -len_del);
						}
					}
					function aff_chm_fct(){
						aff_chm = ! aff_chm;
						box_chm.attr("fill",aff_color(aff_chm,color_chm));
						if( aff_chm){
							line_chm
							  .attr("stroke-dashoffset", len_chm)
							  .transition()
								.duration(1000)
								.ease("linear")
								.attr("stroke-dashoffset", 0);
						}
						else {
							line_chm
							  .attr("stroke-dashoffset", 0)
							  .transition()
								.duration(1000)
								.ease("linear")
								.attr("stroke-dashoffset", -len_chm);
						}
					}
					
					function aff_color(aff,color){ return( aff ? color: color_box_empty);}
						
					var box_x = 20;
					var label_dx = 20;
					var box_y = 30;
					var box_dy = 30;
					var label_dy = 12;
					var box_dy_restart = 45;
					
					var box_sco = svg.append("rect")
						.attr("width", 12)
						.attr("height", 12)                                    
						.attr("x", legend_origine_x+box_x) 
						.attr("y", legend_origine_y+box_y)
						.attr("fill",aff_color(aff_sco,color_sco))
						.attr("stroke", "#000000")
						.attr("class", "legend")
						.attr("stroke-width","1")
						.on("click", aff_sco_fct)
						.on("mouseout", 
							function(d){
								d3.select(this)
									.transition()
									.attr("fill",aff_color(aff_sco,color_sco));	})
						.on("mouseover", 
							function(d){
								d3.select(this)
									.transition()
									.attr("fill",color_sco);	});
					var label_sco = svg.append("text")               
							.attr("x", legend_origine_x+box_x+label_dx) 
							.attr("y", legend_origine_y+box_y+label_dy)
							.style("font-size", "14px")
							.attr("fill","#000000")
							.text("Front National (Nb de voix)");	
					
					var box_imm = svg.append("rect")
						.attr("width", 12)
						.attr("height", 12)                                    
						.attr("x", legend_origine_x+box_x) 
						.attr("y", legend_origine_y+box_y+box_dy)
						.attr("fill",aff_color(aff_imm,color_imm))
						.attr("stroke", "#000000")
						.attr("class", "legend")
						.attr("stroke-width","1")
						.on("click", aff_imm_fct)
						.on("mouseout", 
							function(d){
								d3.select(this)
									.transition()
									.attr("fill",aff_color(aff_imm,color_imm));	})
						.on("mouseover", 
							function(d){
								d3.select(this)
									.transition()
									.attr("fill",color_imm);	});
					var label_sco = svg.append("text")               
							.attr("x", legend_origine_x+box_x+label_dx) 
							.attr("y", legend_origine_y+box_y+box_dy+label_dy)
							.style("font-size", "14px")
							.attr("fill","#000000")
							.text("Immigration");	
									
					var box_del = svg.append("rect")
						.attr("width", 12)
						.attr("height", 12)                                    
						.attr("x", legend_origine_x+box_x) 
						.attr("y", legend_origine_y+box_y+2*box_dy)
						.attr("fill",aff_color(aff_del,color_del))
						.attr("stroke", "#000000")
						.attr("class", "legend")
						.attr("stroke-width","1")
						.on("click", aff_del_fct)
						.on("mouseout", 
							function(d){
								d3.select(this)
									.transition()
									.attr("fill",aff_color(aff_del,color_del));	})
						.on("mouseover", 
							function(d){
								d3.select(this)
									.transition()
									.attr("fill",color_del);	});
					var label_sco = svg.append("text")               
							.attr("x", legend_origine_x+box_x+label_dx) 
							.attr("y", legend_origine_y+box_y+2*box_dy+label_dy)
							.style("font-size", "14px")
							.attr("fill","#000000")
							.text("Délinquance (Nb de condamnations)");
									
					var box_chm = svg.append("rect")
						.attr("width", 12)
						.attr("height", 12)                                    
						.attr("x", legend_origine_x+box_x) 
						.attr("y", legend_origine_y+box_y+3*box_dy)
						.attr("fill",aff_color(aff_chm,color_chm))
						.attr("stroke", "#000000")
						.attr("class", "legend")
						.attr("stroke-width","1")
						.on("click", aff_chm_fct)
						.on("mouseout", 
							function(d){
								d3.select(this)
									.transition()
									.attr("fill",aff_color(aff_chm,color_chm));	})
						.on("mouseover", 
							function(d){
								d3.select(this)
									.transition()
									.attr("fill",color_chm);	});
					var label_sco = svg.append("text")               
							.attr("x", legend_origine_x+box_x+label_dx) 
							.attr("y", legend_origine_y+box_y+3*box_dy+label_dy)
							.style("font-size", "14px")
							.attr("fill","#000000")
							.text("Chomage (taux)");
						
						var trans = 1500;
							
						d_1 = svg_txt.append("text") 
							.attr("x", 350) 
							.attr("y", 50) 
							.attr("text-anchor", "middle") 
							.style("font-size", "22px")
							.attr("fill","#FFFFFF")
							.text("blablabla")
						d_2 = svg_txt.append("text") 
							.attr("x", 350) 
							.attr("y", 75) 
							.attr("text-anchor", "middle") 
							.style("font-size", "22px")
							.attr("fill","#FFFFFF")
							.text("blablabla");	
						
						texte_haut = [	"Depuis les années 1990, Le front national",
										"Peut-on trouver des raisons sociologiques",
										"Le front national est connu",
										"Voici le taux d'immigration en france par année.",
										"La corrélation est nulle.",
										"Le front national est aussi connu",
										"Voici le taux de délinquance en france par année.",
										"Le taux de corrélation est négatif !",
										"Mais alors, quelle peut bien être la cause",
										"Voici la courbe du chômage en france par année.",
										"Oui, cette fois-ci, la corrélation est POSITIVE !",
										"Le niveau du chômage est donc le meilleur facteur"
										];
						texte_bas  = [	"enchaîne des bons résultats aux élections.",
										"ou sociétales à ces résultats ?",
										"pour son discours anti-immigration.",
										"Est-ce corrélé avec le score du FN ?",
										"Il n'y a pas de lien direct entre les deux courbes.",
										"pour son discours autoritaire.",
										"Est-ce corrélé avec le score du FN ?",
										"Le FN a plus de voix lorsque la délinquance est faible.",
										"des résultats du FN ?",
										"Est-ce corrélé avec le score du FN ?",
										"Les courbes du FN et du chômage sont très similaires.",
										"expliquant les hauts scores du FN."
										];
										
						numero_texte = 0;
						
						function aff_txt(){
							d_1.transition()
								.duration(trans)
								.attr("fill","#000000")
								.text(texte_haut[numero_texte]);
							d_2.transition()
								.duration(trans)
								.attr("fill","#000000")
								.text(texte_bas[numero_texte]);
							numero_texte += 1;
						}
						function effacer_txt(){
							d_1.transition()
								.duration(trans)
								.attr("fill","#FFFFFF")
							d_2.transition()
								.duration(trans)
								.attr("fill","#FFFFFF")
						}
						
						var lect = 8000
						
						function animation(){
							numero_texte = 0;
							box_restart
									.transition(trans)
									.attr("width", 0)
									.attr("height", 0);
							label_restart
									.transition(trans)
									.attr("fill","#FFFFFF");
							if( aff_imm ){
								aff_imm_fct();
							}
							if( aff_del){
								aff_del_fct();
							}
							if( aff_chm ){
								aff_chm_fct();
							}
							for( i=0; i<12; i++){
								setTimeout(effacer_txt, i*lect);
								setTimeout(aff_txt, i*lect+trans);
							}
							if( ! aff_sco ){
								setTimeout(aff_sco_fct, 10);
							}
							setTimeout(aff_imm_fct, 3*lect+trans);
							setTimeout(aff_imm_fct, 6*lect+trans);
							setTimeout(aff_del_fct, 6*lect+trans);
							setTimeout(aff_del_fct, 9*lect+trans);
							setTimeout(aff_chm_fct, 9*lect+trans);
							box_restart
									.transition(trans)
									.delay(12*lect)
									.attr("width", 12)
									.attr("height", 12);
							label_restart
									.transition(trans)
									.delay(12*lect)
									.attr("fill","#000000")
									.text("Relancer l'animation");
						}
						
						var box_restart = svg.append("rect")
						.attr("width", 12)
						.attr("height", 12)                                    
						.attr("x", legend_origine_x+box_x) 
						.attr("y", legend_origine_y+box_y+3*box_dy+box_dy_restart)
						.attr("fill",color_box_empty)
						.attr("stroke", "#000000")
						.attr("class", "legend")
						.attr("stroke-width","1")
						.on("click", animation)
						.on("mouseout", 
							function(d){
								d3.select(this)
									.transition()
									.attr("fill",color_box_empty);	})
						.on("mouseover", 
							function(d){
								d3.select(this)
									.transition()
									.attr("fill",color_restart);	});
						var label_restart = svg.append("text")               
								.attr("x", legend_origine_x+box_x+label_dx) 
								.attr("y", legend_origine_y+box_y+3*box_dy+label_dy+box_dy_restart)
								.style("font-size", "14px")
								.attr("fill","#000000")
								.text("Lancer l'animation");
								
						//*/
					}