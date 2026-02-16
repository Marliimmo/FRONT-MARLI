import React from 'react'
import styles from './MentionsLegales.module.scss'
import { Helmet } from 'react-helmet'

function MentionsLegales() {
  return (
    <>
      <Helmet>
        <title>Marli - Mentions légales</title>
        <meta name='robots' content='noindex' />
        <meta name='description' content="Passeur d'histoires immobilières" />
      </Helmet>
      <div className={`fadinAnimation ${styles.allContainer}`}>
        <h2>Mentions Légales</h2>
        <div>
          <h3>1. Informations légales</h3>
          <p>
            Conformément aux dispositions des articles 6-III et 19 de la loi
            pour la Confiance dans l’Économie Numérique, nous vous informons que
            :
          </p>

          <p>
            Le présent site web est édité par : <br />
            Marli Immobilier, Entreprise Individuelle <br />
            2b rue des Jardins, 25 000 Besançon <br />
            SIRET : 92025630200018 <br />
            R.C.S. : Besançon 2022A00629 <br />
          </p>

          <p>Directeur de la publication du site web : Mar Néné</p>

          <p>Le prestataire assurant l’hébergement du site est LWS</p>

          <p>
            Médiateur de la consommation : MÉDIATION CONSOMMATION DÉVELOPPEMENT 
Centre d’Affaires Stéphanois - Immeuble l’Horizon 
Esplanade de France - 3 rue J. Constant Milleret 
42000 SAINT-ETIENNE

          <h3>2. Limitation de responsabilité</h3>
          <p>
            L’utilisateur du site internet marli-immobilier.com reconnaît avoir
            pris connaissance des présentes conditions d’utilisation et s’engage
            à les respecter. <br />
            <br />
            L’utilisateur du site internet marli-immobilier.com reconnaît
            disposer de la compétence et des moyens nécessaires pour accéder et
            utiliser ce site. <br />
            <br />
            L’utilisateur du site internet marli-immobilier.com connaît avoir
            vérifié que la configuration informatique utilisée ne contient aucun
            virus et qu’elle est en parfait état de fonctionnement. <br />
            <br />
            L’entreprise Marli Immobilier met tout en œuvre pour offrir aux
            utilisateurs des informations et/ou des outils disponibles et
            vérifiés mais ne saurait être tenue pour responsable des erreurs,
            d’une absence de disponibilité des fonctionnalités et/ou de la
            présence de virus sur son site. <br />
            <br />
            Les informations fournies par marli-immobilier.com le sont à titre
            indicatif et ne sauraient dispenser l’utilisateur d’une analyse
            complémentaire et personnalisée. <br />
            <br />
            Marli-immobilier.com ne saurait garantir l’exactitude, la
            complétude, l’actualité des informations diffusées sur son site. En
            conséquence, l’utilisateur reconnaît utiliser ces informations sous
            sa responsabilité exclusive. <br />
            <br />
          </p>

          <h3>3. Cookies</h3>
          <p>
            L’utilisateur est informé que lors de ses visites sur le site, un
            cookie peut s’installer automatiquement sur son logiciel de
            navigation.
            <br />
            <br />
            Le cookie est un bloc de données qui ne permet pas d’identifier les
            utilisateurs mais sert à enregistrer des informations relatives à la
            navigation de celui-ci sur le site.
            <br />
            <br />
            Le paramétrage du logiciel de navigation permet d’informer de la
            présence de cookie et éventuellement, de la refuser. L’utilisateur
            dispose de l’ensemble des droits susvisés s’agissant des données à
            caractère personnel communiquées par le biais des cookies dans les
            conditions indiquées ci-dessus.
            <br />
            <br />
            Les utilisateurs du site internet marli-immobilier.com sont tenus de
            respecter les dispositions de la loi n°78-17 du 6 janvier 1978
            modifiée, relative à l’informatique, aux fichiers et aux libertés,
            dont la violation est passible de sanctions pénales.
            <br />
            <br />
            Ils doivent notamment s’abstenir, s’agissant des informations à
            caractère personnel auxquelles ils accèdent ou pourraient accéder,
            de toute collecte, de toute utilisation détournée d’une manière
            générale, de tout acte susceptible de porter atteinte à la vie
            privée ou à la réputation des personnes.
            <br />
            <br />
          </p>

          <h3>4. Propriété intellectuelle</h3>
          <p>
            La structure générale ainsi que les logiciels, textes, images
            animées ou non, son savoir-faire et tous les autres éléments
            composant le site sont la propriété exclusive du site
            marli-immobilier.com.
            <br />
            <br />
            Toute représentation totale ou partielle de ce site ou de son
            contenu par quelle que personne que ce soit, sans l’autorisation
            expresse et écrite du site marli-immobilier.com est interdite et
            constituerait une contrefaçon sanctionnée par les articles L. 335-2
            et suivants du Code de la propriété intellectuelle qui définit la
            contrefaçon comme un délit, et prévoit jusqu’à trois ans
            d’emprisonnement et 300 000 euros d’amende.
            <br />
            <br />
            Il en est de même des bases de données figurant, le cas échéant sur
            le site web qui sont protégées par les dispositions de la loi du 1er
            juillet 1998 portant transposition dans le Code de la propriété
            intellectuelle de la directive du 11 mars 1996 relative à la
            protection juridique des bases de données, et dont le site
            marli-immobilier.com est producteur.
            <br />
            <br />
            Les marques du site marli-immobilier.com et de ses partenaires,
            ainsi que les logos figurant sur le site sont des marques déposées.
            Toute reproduction totale ou partielle de ces marques ou de ces
            logos effectués à partir des éléments du site sans l’autorisation
            expresse du site cine-loges.fr est donc prohibée au sens du Code de
            la propriété intellectuelle.
            <br />
            <br />
            Le site marli-immobilier.com ne saurait être responsable de l’accès
            par les utilisateurs via les liens hypertextes mis en place dans le
            cadre du site internet en direction d’autres ressources présentes
            sur le réseau.
            <br />
            <br />
            Tout litige en relation avec l’utilisation du site
            marli-immobilier.com est soumis au droit français. L’utilisateur
            reconnaît la compétence exclusive des tribunaux compétents de
            Besançon.
            <br />
            <br />
          </p>
        </div>
      </div>
    </>
  )
}

export default MentionsLegales
